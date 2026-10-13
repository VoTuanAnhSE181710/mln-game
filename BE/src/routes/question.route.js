import questionController from '../controllers/question.controller.js';
import { createCrudRouter } from './crud.route.js';

export default createCrudRouter(questionController);