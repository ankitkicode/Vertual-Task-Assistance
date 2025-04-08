import { configureStore } from '@reduxjs/toolkit';
import taskSlice from "../store/task/taskSlice.js";
import userSlice from "../store/user/userSlice.js";

export const store = configureStore({
    reducer: {
        user: userSlice,
        task: taskSlice,
    },
});
