import { Router } from 'express';
import QuestionController from '../controllers/questionController'; // Use import for controllers

const router = Router();

// Define routes
router.get('/', QuestionController.getAllQuestions);
router.get('/answer', QuestionController.getAnswer); // Added '/answer' to differentiate the route
router.post('/', QuestionController.createQuestion);

export default router;
