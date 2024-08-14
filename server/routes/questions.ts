import { Router } from 'express';
import QuestionController from '../controllers/questionController'; // Use import for controllers

const router = Router();

// Define routes
//router.get('/', QuestionController.getAllQuestions);
//router.get('/answer/', QuestionController.getAllQuestions);
router.get('/answer/:message', QuestionController.getAnswer);
//router.post('/', QuestionController.createQuestion);

export default router;
