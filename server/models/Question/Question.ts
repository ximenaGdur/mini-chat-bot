import { Schema, model } from 'mongoose';

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
  answer: {
    type: String,
    required: true,
    maxlength: 1000
  }
});

const Question = model('Question', questionSchema, 'Question');


export default Question;
