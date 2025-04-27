import express from 'express';
import authController from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';


const rourter = express.Router();


rourter.post('/auth/register', authenticate,authController.register ,)

rourter.post('/auth/register', authenticate,authController.login)


export default rourter;