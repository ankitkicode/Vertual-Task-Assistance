import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  tasks: [
    {
      id: 1,
      title: 'Design Homepage',
      description: 'Create a responsive homepage layout.',
      status: 'Pending',
      date: '2025-04-05',
    },
    {
      id: 2,
      title: 'Fix Login Bug',
      description: 'Resolve login validation issue.',
      status: 'In Progress',
      date: '2025-04-01',
    },
    {
      id: 3,
      title: 'Write Documentation',
      description: 'Add README and API documentation.',
      status: 'Completed',
      date: '2025-03-15',
    },
    {
      id: 4,
      title: 'Client Meeting',
      description: 'Discuss project requirements with the client.',
      status: 'Pending',
      date: '2025-04-06',
    },
    {
      id: 5,
      title: 'Update User Profile UI',
      description: 'Improve layout and mobile responsiveness.',
      status: 'In Progress',
      date: '2025-04-06',
    },
    {
      id: 6,
      title: 'Deploy to Production',
      description: 'Release new version to live server.',
      status: 'Pending',
      date: '2025-04-07',
    },
    {
      id: 7,
      title: 'Create Marketing Banner',
      description: 'Design promotional banner for new feature.',
      status: 'Pending',
      date: '2025-04-07',
    },
    {
      id: 8,
      title: 'Wecrowd Client Meeting',
      description: 'Discuss project requirements with the client.',
      status: 'Pending',
      date: '2025-04-06',
    },
    {
      id: 9,
      title: 'Update Admin Profile',
      description: 'Improve layout and mobile responsiveness.',
      status: 'Completed',
      date: '2025-04-07',
    },
    {
      id: 10,
      title: 'Wecrowd UI Update',
      description: 'Discuss project requirements with the client.',
      status: 'Pending',
      date: '2025-04-07',
    },
    {
      id: 11,
      title: 'Update Website UI',
      description: 'Improve layout and mobile responsiveness.',
      status: 'Completed',
      date: '2025-04-07',
    },
    {
      id: 12,
      title: 'Update UserPanel UI',
      description: 'Improve layout and mobile responsiveness.',
      status: 'In Progress',
      date: '2025-04-07',
    },
  ],
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
      addTask: (state, action) => {
        state.tasks.push({ id: nanoid(), ...action.payload });
      },
      updateTask: (state, action) => {
        const { id, updatedTask } = action.payload;
        const index = state.tasks.findIndex((task) => task.id === id);
        if (index !== -1) {
          state.tasks[index] = { id, ...updatedTask };
        }
      },
      deleteTask: (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      },
    },
  });
  
  export const { addTask, updateTask, deleteTask } = taskSlice.actions;
  export default taskSlice.reducer;