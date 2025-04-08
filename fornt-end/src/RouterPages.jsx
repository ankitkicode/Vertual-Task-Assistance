import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Routers } from './constants/Routes';
import Layout from './Layout/Layout';
import HomePage from './Pages/HomePage';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Task from './Pages/Task';
import TaskReport from './Pages/TaskReport';
import AllTodayTask from './Component/AllTodayTask';
import PublicRoute from './Component/PublicRoute';
import ProtectedRoute from './Component/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import Settings from './Pages/Settings';

const RouterPages = () => {
  return (
    <>
      <Routes>
        <Route
          path={Routers.LOGIN}
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path={Routers.REGISTER}
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path={Routers.HOMEPAGE}
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path={Routers.UNIVERSAL} element={<HomePage />} />
          <Route index element={<HomePage />} />
          <Route path={Routers.PROFILE} element={<Profile />} />
          <Route path={Routers.TASK} element={<Task />} />
          <Route path={Routers.TASK_REPORT} element={<TaskReport />} />
          <Route path={Routers.ALL_TODAY_TASK} element={<AllTodayTask />} />
          <Route path={Routers.SETTINGS} element={<Settings />} />
        </Route>
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default RouterPages;
