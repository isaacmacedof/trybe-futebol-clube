import { Router } from 'express';
import ControllerTeams from '../controller/controllerTeams';

const routR = Router();

const controllerTeams = new ControllerTeams();

routR.get('/teams', (req, res) => controllerTeams.getTeams(req, res));

export default routR;
