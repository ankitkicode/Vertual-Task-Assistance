import React, { useEffect, useState } from 'react';
import { FaHome,  FaSignOutAlt } from "react-icons/fa";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FiChevronsRight } from 'react-icons/fi';
import { Routers } from '../constants/Routes';
import { CgProfile } from 'react-icons/cg';
import { AiFillSetting } from 'react-icons/ai';
import Footer from '../Component/Footer';
import { getProfile } from '../api/user.api';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [data, setData] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();


    const menuItems = [
        { path: Routers.HOMEPAGE, label: "Dashboard", icon: <FaHome /> },
        { path: Routers.PROFILE, label: "Profile", icon: <CgProfile /> },
        { path: Routers.TASK, label: "Task", icon: <FaHome /> },
        { path: Routers.TASK_REPORT, label: "Task Report", icon: <FaHome /> },
        { path: Routers.SETTINGS, label: "Setting", icon: <AiFillSetting /> },
        
    ];

    const actionButtons = [
        {
            label: "Logout",
            icon: <FaSignOutAlt />,
            bgColor: "bg-[#F04B4B]",
            func: () => {
                localStorage.removeItem("token");
                navigate(Routers.LOGIN);
            },
        },
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    const fetchProfileData = async () => {
        try {
            const response = await getProfile();
            setData(response.data.user);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    useEffect(() => {
        fetchProfileData();
    },[]);

    return (
        <>
            <div className="flex justify-end md:p-2 gap-4 w-full h-screen bg-bg-color text-text-color">
                <div className={`absolute md:relative w-[280px] py-5 z-50 h-full bg-text-color/5 backdrop-blur-xl  md:rounded-md flex duration-300 flex-col ${!isSidebarOpen ? "md:left-0 -left-full" : "md:-left-full left-0"
                    }`}
                >
                    <div className="px-4 flex">
                        <div className="w-full flex items-center justify-between">
                            <div className='py-2'>
                                <p className='text-text-color'>TASK MANAGEMENT</p>
                            </div>
                            <button
                                onClick={toggleSidebar}
                                className={`text-xl  focus:outline-none text-text-color bg-text-color/5 rounded-md p-2  ${!isSidebarOpen ? "hidden" : "block"
                                    }`}
                            >
                                <FiChevronsRight />
                            </button>
                            <button
                                onClick={toggleSidebar}
                                className={`text-lg md:hidden  focus:outline-none text-text-color bg-text-color/5 text-bg-white rounded-md p-1  ${isSidebarOpen ? "hidden" : "block"
                                    }`}
                            >
                                <FiChevronsRight />
                            </button>
                        </div>
                    </div>
                    <nav className="scrollbar-left overflow-y-auto">
                        <ul className="py-2 px-4 ">
                            <div className='flex flex-col gap-2  p-4 bg-text-color/5 backdrop-blur-2xl rounded-2xl'>
                                {menuItems.map(({ path, label, icon }) => {
                                    const isActive = location.pathname === path;
                                    return (
                                        <li key={path}>
                                            <Link
                                                onClick={() => setIsSidebarOpen(false)}
                                                to={path}
                                                className={`flex items-center gap-2 hover:gap-3 transition-all duration-300 rounded-full p-2 group text-sm ${isActive ? "text-text-color bg-bg-color1" : "text-text-color/80 font-light"}`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className={`p-1 ${isActive ? "text-text-color bg-bg-color p-2 rounded-full" : ""}`}>
                                                        <p className="text-base">{icon}</p>
                                                    </div>
                                                    {label}
                                                </div>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </div>
                        </ul>
                    </nav>
                    <div className="px-4 py-2">
                        <div className='flex flex-col gap-2  p-4 bg-text-color/5 backdrop-blur-2xl rounded-2xl'>
                            {actionButtons.map(({ label, icon, bgColor, func }, index) => (
                                <div key={index} className="p-1">
                                    <button
                                        onClick={func}
                                        className="flex w-full items-center text-text-color/80  duration-500 transition-all gap-1 text-sm font-normal"
                                    >
                                        <div className={`p-1 text-lg rounded-lg`}>
                                            {icon}
                                        </div>
                                        {label}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col w-full h-full duration-200 ${isSidebarOpen ? "w-full" : "md:w-[calc(100%-280px)]"} flex-shrink-0`}>
                    <main className="overflow-y-auto  flex flex-col gap-1 pr-2">
                        <header className="flex items-center  p-2 md:rounded-md bg-text-color/5 backdrop-blur-xl  justify-between">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={toggleSidebar}
                                    className={`text-xl focus:outline-none text-text-color bg-text-color/5 rounded-md p-2  ${!isSidebarOpen ? "hidden" : "block"
                                        }`}
                                >
                                    <FiChevronsRight />
                                </button>
                                <button
                                    onClick={toggleSidebar}
                                    className={`text-xl  focus:outline-none text-text-color bg-text-color/5 rounded-md p-2  ${isSidebarOpen ? "hidden" : "block"
                                        }`}
                                >
                                    <FiChevronsRight />
                                </button>
                            </div>
                            <div className="flex items-center md:gap-10 gap-4">
                                {/* <button
                                    onClick={() => setIsPopupOpen(true)}
                                    className="bg-bg-color1/90 text-white px-4 py-2  hover:bg-bg-color1 md:text-sm text-xs rounded  flex items-center gap-2"
                                >
                                    <FaPlus /> Add Task
                                </button> */}
                                <div className='flex items-center gap-4'>
                                    <div className='flex flex-col items-end'>
                                        <p className="text-text-color text-sm md:text-base font-semibold capitalize">{data?.firstname} {data?.lastname}</p>
                                        <p className='text-xs text-text-color'>{data.email}</p>
                                    </div>
                                    <div className='md:w-10 md:h-10 w-8 h-8 rounded-md overflow-hidden  bg-red-300'>
                                    <img 
  className='w-full h-full object-cover' 
  src={data.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSIRYFeFCUaj8kiH8kCt6qKYuPwbr6fhoXDA&s"} 
  alt="" 
/>                                    </div>
                                </div>
                            </div>



                        </header>
                        <div className='pr-2  pt-4'>
                            <Outlet data={data} />
                        </div>
                        <div className=' mt-4'>
                            <Footer />
                        </div>
                    </main>
                </div>
            </div>

            {/* {
                isPopupOpen && (
                    <AddTask
                        onClose={() => setIsPopupOpen(false)}
                        onAdd={handleAddTask}
                        newTask={newTask}
                        setNewTask={setNewTask}
                    />
                )
            } */}
        </>
    );
};

export default Layout;
