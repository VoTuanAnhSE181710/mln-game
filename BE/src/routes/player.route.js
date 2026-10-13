import playerController from '../controllers/player.controller.js';
import { createCrudRouter } from './crud.route.js';

export default createCrudRouter(playerController);