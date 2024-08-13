import { Schema, model } from 'mongoose';
import IQuestion from './IQuestion';

const questionSchema: Schema = new Schema({
  keyword: { type: String, required: true, unique: true },
  message: { type: String, required: true },
  response: { type: String, required: true }
});

const Question = model<IQuestion>('Question', questionSchema);

export default Question;
