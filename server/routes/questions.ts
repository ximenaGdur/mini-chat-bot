import { Router } from 'express';
import QuestionController from '../controllers/questionController'; // Use import for controllers

const router = Router();

// Define routes
router.get('/answer/:message', QuestionController.getAnswer);

export default router;
