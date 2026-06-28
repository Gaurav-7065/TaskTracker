import express from 'express';
import { getAllTasks, createTask,deleteTask,updatedTask} from '../controllers/taskController.js';

const router = express.Router();

router.get('/', getAllTasks);
router.post('/', createTask);

router.put('/:id',updatedTask);
router.delete('/:id',deleteTask);

export default router;