import { Router } from 'express';
import ControllerMatches from '../controller/controllerMatches';

const routM = Router();

const controllerMatches = new ControllerMatches();

routM.get('/matches', (req, res) => controllerMatches.getMatches(req, res));

export default routM;
