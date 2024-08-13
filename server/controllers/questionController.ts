import { Request, Response } from 'express';
import IQuestion from '../models/Question/IQuestion';
import Question from '../models/Question/Question';

class QuestionController {
  private static DefaultMessage = "I'm sorry, I didn't understand that question.";

  /**
   * Gets all keywords stored in the database.
   * @returns {Promise<string[]>} A promise that resolves to an array of keywords.
   */
  private static async getAllKeywords(): Promise<string[]> {
    try {
      const keywords = await Question.find().select('keyword').lean();
      return keywords.map((keywordObj: { keyword: string }) => keywordObj.keyword);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to retrieve keywords');
    }
  }

  /**
   * Checks if a sentence contains any keywords.
   * @param {string[]} keywords List of keywords.
   * @param {string} sentence Question asked.
   * @returns {string | null} The found keyword or null if not found.
   */
  private static getKeywordInQuestion(keywords: string[], sentence: string): string | null {
    for (const word of keywords) {
      if (sentence.includes(word)) {
        return word;
      }
    }
    return null;
  }

  /**
   * Gets the answer for a specific question.
   * @param {Request} req Parameters for request.
   * @param {Response} res Result of get operation.
   */
  public static async getAnswer(req: Request, res: Response): Promise<void> {
    const questionAsked = req.params.message;
    try {
      const allKeywords = await QuestionController.getAllKeywords();
      const keywordInQuestion = QuestionController.getKeywordInQuestion(allKeywords, questionAsked);

      if (keywordInQuestion) {
        const question: IQuestion | null = await Question.findOne({ keyword: keywordInQuestion }).lean();

        if (!question) {
          res.json({ response: QuestionController.DefaultMessage });
        } else {
          res.json({ response: question.response });
        }
      } else {
        res.json({ response: QuestionController.DefaultMessage });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Gets all questions stored in the database.
   * @param {Request} req Parameters for request.
   * @param {Response} res Result of get operation.
   */
  public static async getAllQuestions(req: Request, res: Response): Promise<void> {
    try {
      const questions = await Question.find().select('message').lean();
      res.json(questions);
    } catch (error: any) {
      console.error(error);
      res.status(500).send(error);
    }
  }

  /**
   * Creates a new question and stores it in the database.
   * @param {Request} req Parameters for request.
   * @param {Response} res Result of get operation.
   */
  public static async createQuestion(req: Request, res: Response): Promise<void> {
    const question = new Question({
      keyword: req.body.keyword,
      message: req.body.message,
      response: req.body.response,
    });

    try {
      const newQuestion = await question.save();
      res.status(201).json(newQuestion);
    } catch (error: any) {
      console.error(error);
      res.status(400).send(error);
    }
  }
}

export default QuestionController;
