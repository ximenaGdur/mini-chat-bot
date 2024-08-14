import { Document } from 'mongoose';

interface IQuestion extends Document {
  keyword: string;
  message: string;
  answer: string;
}

export default IQuestion;