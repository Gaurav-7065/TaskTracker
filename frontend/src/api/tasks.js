import { API } from './axiosInstance';


// Fetch all tasks
export const getTasks = async (params = {}) => {
    const response = await API.get('/tasks', { params });
    return response.data;
};

// Create a brand new task
export const createTask = async (taskData) => {
    const response = await API.post('/tasks', taskData);
    console.log(response.data);
    return response.data;
};

// Update an existing task's 
export const updateTask = async (id, updatedData) => {
    const response = await API.put(`/tasks/${id}`, updatedData);
    return response.data;
};

// Delete a task
export const deleteTask = async (id) => {
    const response = await API.delete(`/tasks/${id}`);
    return response.data;
};