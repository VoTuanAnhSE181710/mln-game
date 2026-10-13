import Question from '../models/question.js';
import { createCrudService } from './crud.service.js';

export default createCrudService(Question, 'Question');