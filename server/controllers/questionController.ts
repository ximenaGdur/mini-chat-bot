import { Request, Response } from 'express';
import IQuestion from '../models/Question/IQuestion';
import Question from '../models/Question/Question';

class QuestionController {
  private static DefaultMessage = "I'm sorry, I didn't understand that question.";
  private static attributeLengths = {"keyword": 100, "message": 500, "response": 1000};

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

    // Validate input
    if (typeof questionAsked !== 'string' || questionAsked.trim().length === 0) {
      res.status(400).json({ message: 'Invalid question input' });
      return;
    }

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
   * Validates if input is valid or not.
   * @param {any} input Object to validate. 
   * @param {number} length Expected length.
   * @returns {boolean} Whether it's valid or not.
   */
  private static isInvalid(input: any, length: number): boolean {
    return typeof input != 'string' || input.length <= 0 || input.length > length;
  }


  /**
   * Creates a new question and stores it in the database.
   * @param {Request} req Parameters for request.
   * @param {Response} res Result of get operation.
   */
  public static async createQuestion(req: Request, res: Response): Promise<void> {
    const { keyword, message, response } = req.body;

    // Validate input
    if (
      this.isInvalid(keyword, this.attributeLengths["keyword"]) ||
      this.isInvalid(message, this.attributeLengths["message"]) ||
      this.isInvalid(response, this.attributeLengths["response"])
    ) {
      res.status(400).json({ message: 'Invalid input data' });
      return;
    }

    const question = new Question({ keyword, message, response });

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
