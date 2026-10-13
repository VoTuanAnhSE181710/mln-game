import questionService from '../services/question.service.js';
import { createCrudController } from './crud.controller.js';

export default createCrudController(questionService);