import Task from '../models/Task.js';

// get All Task
export const getAllTasks = async (req, res) => {
    try {

        const { status, sortBy } = req.query;


        let queryCondition = { deletedAt: null };


        if (status) {
            queryCondition.status = status;
        }

        // 4. Determine sorting behavior dynamically
        let sortCondition = { createdAt: -1 };
        if (sortBy === 'oldest') {
            sortCondition = { createdAt: 1 };
        }

        // 5. Run the query using your dynamic conditions
        const tasks = await Task.find(queryCondition).sort(sortCondition);

        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// createTask Controller

export const createTask = async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//updateTask Controller 

export const updatedTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedTask) return res.status(404).json({ message: 'Task not found' });

        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// delete Task controller

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        // Performing a soft delete by setting deletedAt
        const task = await Task.findByIdAndUpdate(
            id,
            { deletedAt: new Date() },
            { new: true }
        );

        if (!task) return res.status(404).json({ message: 'Task not found' });

        res.status(200).json({ message: 'Task moved to trash' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};