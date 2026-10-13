import Player from '../models/player.js';
import { createCrudService } from './crud.service.js';

export default createCrudService(Player, 'Player');