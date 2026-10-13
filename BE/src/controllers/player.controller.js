import playerService from '../services/player.service.js';
import { createCrudController } from './crud.controller.js';

export default createCrudController(playerService);