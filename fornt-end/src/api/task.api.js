import { backendConfig } from "../constants/mainContent";
import axios from "axios";

const origin = backendConfig?.origin;

// const api = axios.create({

export const getTodaytask = async () => {
  try {
    const response = await axios.get(`${origin}/tasks/today-tasks`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};


export const getYesterdaytask = async () => {
  try {
    const response = await axios.get(`${origin}/tasks/yesterday-task`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// /fkxngfkngxgnk

export const getWeeklytask = async () => {
  try {
    const response = await axios.get(`${origin}/tasks/weekly-report`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getMonthlytask = async () => {
  try {
    const response = await axios.get(`${origin}/tasks/monthly-report`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const addTask = async (payload) => {
  try {
    const response = await axios.post(`${origin}/tasks/add`, payload, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export const updateTask = async (payload , id) => {
  try {
    const response = await axios.put(`${origin}/tasks/update/${id}`, payload ,{
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export const deleteTask = async ( id) => {
  try {
    const response = await axios.delete(`${origin}/tasks/delete/${id}`,{
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}




// sfdgsdgdgvxv
// sfasfs
// dfzzdf

