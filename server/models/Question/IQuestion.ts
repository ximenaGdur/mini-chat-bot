import { Document } from 'mongoose';

interface IQuestion extends Document {
  keyword: string;
  message: string;
  response: string;
}

export default IQuestion;