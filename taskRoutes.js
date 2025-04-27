import exprss from 'express';
import {createTask, assignTasks, editTask, deleteTask} from '../controllers/taskController.js';

import auth from '../middleware/authMiddleware.js'

const router = exprss.Router();

// Route for creating a new task
router.post('/create', auth, createTask);

// Route for assigning tasks to users
router.post('/assign', auth, assignTasks);

// Route for updating a task
router.patch('/edit/:id', auth, editTask);

// Route for deleting a task
router.delete('/delete/:id', auth, deleteTask);

