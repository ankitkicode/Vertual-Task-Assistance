import React, { useEffect, useState } from 'react';
import {  getMonthlytask, getWeeklytask, getYesterdaytask } from '../api/task.api';

const TaskReport = () => {
  const [tasks, setTasks] = useState([])
  const [activeTab, setActiveTab] = useState('yesterday');

  useEffect(() => {
    const fetchTasks = async () => {
       if(activeTab === 'yesterday'){
      const data = await getYesterdaytask();
      setTasks(data.data);
       } else if(activeTab === 'weekly'){
        const data = await getWeeklytask();
        setTasks(data.data);
       }else if(activeTab === 'monthly'){
        const data = await getMonthlytask();
        setTasks(data.data);
       }
      }
      fetchTasks()

  } , [activeTab]);

  return (
    <div className="bg-text-color/5 p-4  min-h-96 flex flex-col gap-5 rounded-xl shadow-md">
      <h1 className="text-lg font-medium">Task Report</h1>

      {/* Tabs */}
      <div className="flex space-x-4">
        {['yesterday', 'weekly', 'monthly'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-light transition-all duration-200 ${
              activeTab === tab
                ? 'bg-bg-color1 text-text-color'
                : 'border border-bg-color1 text-bg-color1 hover:text-text-color hover:bg-bg-color1'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {tasks?.length === 0 ? (
        <p className="text-sm text-gray-500">No tasks found for this period.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" >
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-text-color/5 rounded-xl flex items-start justify-between shadow-md p-5"
            >
              <div className="flex flex-col gap-2 items-start">
                <h2 className="text-base">{task.title}  ( <span className='text-sm'>{task.category} <span/></span>) </h2>
                <p className="text-text-color/60 font-light text-sm">{task.description}</p>
               <div className="flex items-center gap-2 mt-2">
               <span
                  className={`inline-block px-3 py-1 text-sm rounded-full ${
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
                  className={`inline-block px-3 py-1 text-sm rounded-full `}
                >
                  {task.priority === 'High'
                    ? 'bg-red-600 text-white'
                    : task.priority === 'Medium'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-green-600 text-white'
                  }
                </span>
               </div>
                <p className="text-xs text-gray-400 mt-1">Date: {new Date(task.dueDate).toISOString().split('T')[0]}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskReport;
