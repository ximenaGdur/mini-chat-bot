import { Request, Response } from 'express';
import IQuestion from '../models/Question/IQuestion';
import Question from '../models/Question/Question';

class QuestionController {
  private static attributeLengths = {"keyword": 100, "message": 500, "response": 1000};

  /**
   * Gets all keywords stored in the database.
   * @returns {Promise<string[]>} A promise that resolves to an array of keywords.
   */
  private static async getAllKeywords(): Promise<string[]> {
    try {
      const keywords = await Question.find().select('keyword').lean<IQuestion[]>();
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
   * Validates if input is valid or not.
   * @param {any} input Object to validate. 
   * @param {number} length Expected length.
   * @returns {boolean} Whether it's valid or not.
   */
  private static isInvalid(input: any, length: number): boolean {
    return typeof input != 'string' || input.length <= 0 || input.length > length;
  }

  /**
   * Gets all possible questions that ther bot can answer and returns them to user.
   * @returns {Promise<string>} All possible questions in a string format.
   */
  private static async getDefaultAnswer(): Promise<string> {
    const defaultMessage = "I'm sorry, I didn't understand that question.\n\nYou can try one of these:\n";
    const possibleQuestions = await this.getAllKeywords();
    let questionString = "";
    if (possibleQuestions.length != 0)
      questionString = possibleQuestions.join("\n");
    return defaultMessage + "\n" + questionString;
  }

  /**
   * Gets answer to keyword.
   * @param {string} keywordInQuestion Keyword to look for.
   * @returns {Promise<string>} All possible questions in a string format.
   */
  private static async getAnswerToKeyword(keywordInQuestion: string): Promise<string> {
    let answer = "";
    try {
      const question: IQuestion | null = await Question.findOne({ keyword: keywordInQuestion }).lean();
      if (question) {
        answer = question.answer;
      }
    } catch (error: any) {
      console.error(error);
    }
    return answer;
  }

  /**
   * Gets the answer for a specific question.
   * @param {Request} req Parameters for request.
   * @param {Response} res Result of get operation.
   */
  public static async getAnswer(req: Request, res: Response): Promise<void> {
    // Decoding message
    const decodedMessage = decodeURIComponent(req.params.message);
    // Message that is going to be sent back
    let responseMessage = "";

    try {
      // Checks if input is valid
      if (!this.isInvalid(decodedMessage, this.attributeLengths["message"])) {
        // Transforming to lower case
        const questionAsked = decodedMessage.toLowerCase();
        
          // Getting all keywords.
          const allKeywords = await this.getAllKeywords();
          // Check if question matches with any keyword.
          const keywordInQuestion = this.getKeywordInQuestion(allKeywords, questionAsked);
          // Get response to question associated to that keyword.
          if (keywordInQuestion)
            responseMessage = await this.getAnswerToKeyword(keywordInQuestion);
      }
      if (responseMessage = "") {
        responseMessage = await this.getDefaultAnswer();
      }
    } catch (error: any) {
      console.error(error);
    }

    res.json({ responseMessage });
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
