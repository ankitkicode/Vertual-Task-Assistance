import React, { useState, useEffect } from "react";
import InputField from "../Component/InputFields";
import { getProfile, updateProfile } from "../api/user.api";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/user/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    profileimage: null,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      phone: formData.phone,
      profileimage: formData.profileimage,
    }
    console.log("Form Data Submitted:", payload);
    // Call the updateProfile API here with the payload
    const response = await updateProfile(payload);
    if (response.status === 200) {
      console.log("Profile updated successfully:", response.data);
      const { user } = response.data;
      dispatch(setUser(user)); 
      setIsEditing(false); // Exit edit mode after successful update
      toast.success("Profile updated successfully!");


    }
  };

  const fetchProfileData = async () => {
    try {
      const response = await getProfile();
      const { firstname, lastname, email, phone } = response.data.user;
      setFormData({
        firstname,
        lastname,
        email,
        phone,
        // profileimage: null,
      });
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div className="flex flex-col gap-5 bg-text-color/5 p-5 rounded-md">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-text-color text-base font-medium">Profile Details</h1>
        <button
          className="px-5 text-sm py-2 bg-bg-color1 text-white rounded"
          type="button"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-bg-white rounded-md flex flex-col gap-5">
        <div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full">
          <InputField
            label="First Name"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          <InputField
            label="Last Name"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          <InputField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled
          />
          <InputField
            label="Phone No"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        {isEditing && (
          <div className="self-end mt-4">
            <button
              type="submit"
              className="px-5 py-2 bg-bg-color1 text-white rounded"
            >
              Save
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
