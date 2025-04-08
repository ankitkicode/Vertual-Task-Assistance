import React, { useEffect } from 'react'
import { getProfile, updateEmailNotification } from '../api/user.api';
import { toast } from 'react-toastify';

const Settings = () => {
  const [user, setUser] = React.useState(null);
  const [emailNotification, setEmailNotification] = React.useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await getProfile();
        setUser(response.data.user);
        setEmailNotification(response.data.user.onEmailNotification); // 👈 initial value
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } 
    };
    fetchProfileData();
  }, []);


  const toggleNotification = async () => {
    const updatedValue = !emailNotification; 
  
    try {
      const response = await updateEmailNotification({ onEmailNotification: updatedValue });
  
      if (response?.data?.success) { // success ke basis pe state update karenge
        setEmailNotification(updatedValue); // ✅ abhi flip kar
        toast.success(response.data.message || "Email Notification updated successfully");
      } else {
        toast.error(response.data.message || "Failed to update notification setting");
      }
      
    } catch (error) {
      console.error("Error updating notification:", error);
      toast.error("Failed to update email notification");
    }
  };
  

  return (
    <div className='flex flex-col gap-5 min-h-[70vh]'>

      {/* Gmail Setting */}
      <div className='flex items-center justify-between gap-2 rounded-md bg-zinc-900 py-3 px-4'>
        <div>
          <h1 className='text-sm'>Gmail</h1>
          <p className='text-xs text-gray-400'>{user?.email}</p>
        </div>
        <input 
          type="text" 
          className='bg-transparent text-sm text-text-color outline-none border-b-2 border-b-bg-color1' 
          placeholder='Enter your Gmail' 
        />
      </div>

      {/* Email Notification Toggle */}
      <div className='flex items-center justify-between gap-2 rounded-md bg-zinc-900 py-3 px-4'>
        <div>
          <h1 className='text-sm'>Email Notifications</h1>
          <p className='text-xs text-gray-400'>Get notified on your email</p>
        </div>
        <label className="inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            checked={emailNotification} 
            onChange={toggleNotification} 
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-400 rounded-full peer peer-checked:bg-blue-500 relative">
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
          </div>
        </label>
      </div>

    </div>
  );
};

export default Settings;
