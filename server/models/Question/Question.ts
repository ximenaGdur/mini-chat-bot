import { Schema, model } from 'mongoose';
import IQuestion from './IQuestion';

const questionSchema: Schema = new Schema({
  keyword: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  },
  message: {
    type: String,
    required: true,
    maxlength: 500
  },
  response: {
    type: String,
    required: true,
    maxlength: 1000
  }
});

const Question = model<IQuestion>('Question', questionSchema);

export default Question;
