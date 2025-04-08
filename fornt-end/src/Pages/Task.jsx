import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import AddTask from './AddTask';
import axios from 'axios';
import { addTask, deleteTask, getTodaytask, updateTask } from '../api/task.api';
import { toast } from 'react-toastify';

const origin = import.meta.env.VITE_BACKEND_URL;

const Task = () => {
    const [todayTasks, setTodayTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newTask, setNewTask] = useState({ title: '', description: '',  status: '', dueDate: '', category: '', priority: '' });
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const fetchTodayTasks = async () => {
        try {
            const {data} = await getTodaytask();
            // console.log(data.data);
            setTodayTasks(data.data);
            
        } catch (error) {
            console.log("Error fetching today tasks:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodayTasks();
    }, []);

    const handleAddTask = async () => {
        // console.log(newTask);
        try{
        const payload = {

            title: newTask.title,
            description: newTask.description,
            status: newTask.status,
            dueDate: newTask.dueDate,
            category: newTask.category,
            priority: newTask.priority
        };

        if (isEditing) {
            const response = await updateTask(payload,newTask._id);
            console.log(response.data);
            // setTodayTasks([...todayTasks, response.data]);
            setIsEditing(false);
            setEditId(null);
            setIsPopupOpen(false);
            toast.success("Task updated successfully!");
            setTodayTasks(todayTasks.map((task) => (task._id === newTask._id ? response.data : task)));
            

            setNewTask({ title: '', description: '', status: '', dueDate: '', category:'', priority: '' });

        }
        else {
            const response = await addTask(payload);
            setTodayTasks([...todayTasks, response.data]);
            setIsEditing(false);
            setEditId(null);
            setIsPopupOpen(false);
            toast.success("Task added successfully!");
            setNewTask({ title: '', description: '', status: '', dueDate: '', category:'', priority: '' });
            
        }
    }catch (error) {
            console.log("Error creating task:", error);
        }



    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];  // "2025-04-08"
      };

    const handleEdit = (task) => {
        // console.log(task);
        if (task) {
            setNewTask({ ...task, dueDate: formatDate(task.dueDate) });
            setIsEditing(true);
            setEditId(task._id);
            setIsPopupOpen(true);
        }
    };

    const handleDelete = async (id) => {
        console.log(id);
        try {
           const response = await deleteTask(id);
           console.log(response.data);
           setTodayTasks(todayTasks.filter((task) => task._id !== id));
              toast.success("Task deleted successfully!");
              setIsPopupOpen(false);
                setIsEditing(false);
        } catch (error) {
            console.log("Error deleting task:", error);
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-medium">All Today's Tasks</h1>
                <button
                    onClick={() => {
                        setIsEditing(false);
                        setNewTask({ title: '', description: '', status: 'Pending' ,dueDate: '', category: '', priority: 'High' });
                        setIsPopupOpen(true);
                    }}
                    className="bg-bg-color1/90 text-white px-4 py-2 hover:bg-bg-color1 text-sm rounded flex items-center gap-2"
                >
                    <FaPlus /> Add Task
                </button>
            </div>

            {loading ? (
                <p className="text-sm text-gray-500">Loading tasks...</p>
            ) : todayTasks.length === 0 ? (
                <p className="text-sm text-gray-500">No tasks for today.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {todayTasks.map((task) => (
                        <div key={task.id} className="bg-text-color/5 rounded-xl flex items-start justify-between shadow-md p-5">
                            <div className="flex flex-col gap-2 items-start">
                                <h2 className="text-base">{task.title} ( <span className='text-sm'>{task.category}</span> )</h2>
                                <p className="text-text-color/60 font-light text-sm">{task.description}</p>
                                <div className="flex items-center gap-2 mt-2">
               <span
                  className={`inline-block px-3 py-1 text-[.75rem] rounded-full ${
                    task.status === 'Completed'
                      ? 'bg-bg-color text-green-600'
                      : task.status === 'Progress'
                      ? 'bg-bg-color text-yellow-600'
                      : 'bg-bg-color text-red-600'
                  }`}
                >
                  {task.status}
                </span>
                <span
                  className={`inline-block bg-zinc-900 px-3 py-1 text-[.75rem] rounded-full `}
                >
                    {task.priority }

                </span>

               </div>
                                <p className="text-xs text-gray-400 mt-1">Date: {new Date(task.dueDate).toISOString().split('T')[0]}</p>

                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => handleEdit(task)} className="bg-text-color/10 text-bg-color1 p-2 rounded">
                                    <FaEdit />
                                </button>
                                <button onClick={() => handleDelete(task._id)} className="bg-text-color/10 text-bg-color1 p-2 rounded">
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}

                </div>
            )}

            {isPopupOpen && (
                <AddTask
                    onClose={() => {
                        setIsPopupOpen(false);
                        setIsEditing(false);
                        setNewTask({ title: '', description: '', status: 'Pending', dueDate: '', category: '', priority: 'High' });
                    }}
                    onAdd={handleAddTask}
                    newTask={newTask}
                    setNewTask={setNewTask}
                    isEditing={isEditing}
                />
            )}
        </div>
    );
};

export default Task;
