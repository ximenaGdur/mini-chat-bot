import { Request, Response } from 'express';
import IQuestion from '../models/Question/IQuestion';
import Question from '../models/Question/Question';

class QuestionController {
  private static attributeLengths = {"keyword": 100, "message": 500, "response": 1000};

  /**
   * Gets all questions stored in the database.
   * @returns {Record<string, IQuestion>>} A promise that resolves to a dictionary of questions.
   */
  private static async getAllQuestions(): Promise<Record<string, IQuestion>> {
    try {
      const questionArray = await Question.find().lean<IQuestion[]>();
      return questionArray.reduce((dict, question) => {
        dict[question.keyword] = question;
        return dict;
      }, {} as Record<string, IQuestion>);
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
    for (const keyword of keywords) {
      // The 'i' flag for case-insensitive matching and '\b' to match standalone words
      const regex = new RegExp(`\\b${keyword}\\b`, 'i');
      if (regex.test(sentence)) {
        return keyword;
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
   * @returns {string} All possible questions in a string format.
   */
  private static getDefaultAnswer(allQuestions: IQuestion[]): string {
    let defaultMessage = "I'm sorry, I didn't understand that question.\n";
    if (allQuestions.length != 0) {
      defaultMessage += "\nYou can try one of these:\n";
      for(const question of allQuestions) {
        defaultMessage += "- " + question.message + "\n"
      }
    }
    return defaultMessage;
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
      // Getting all questions.
      const allQuestions = await QuestionController.getAllQuestions();
      if (allQuestions) {
        // Checks if input is valid
        if (!QuestionController.isInvalid(decodedMessage, QuestionController.attributeLengths["message"])) {
          // Check if question matches with any keyword.
          const keywordInQuestion = QuestionController.getKeywordInQuestion(Object.keys(allQuestions), decodedMessage);
          // Get response to question associated to that keyword.
          if (keywordInQuestion)
            responseMessage = allQuestions[keywordInQuestion].answer;
        }
        if (responseMessage == "")
          responseMessage = QuestionController.getDefaultAnswer(Object.values(allQuestions));
      } else {
        responseMessage = "Try later."
      }
    } catch (error: any) {
      console.error(error);
    }
    res.json({ responseMessage });
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
      QuestionController.isInvalid(keyword, QuestionController.attributeLengths["keyword"]) ||
      QuestionController.isInvalid(message, QuestionController.attributeLengths["message"]) ||
      QuestionController.isInvalid(response, QuestionController.attributeLengths["response"])
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
