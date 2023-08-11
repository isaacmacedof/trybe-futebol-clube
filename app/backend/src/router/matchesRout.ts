import { Router } from 'express';
import ControllerMatches from '../controller/controllerMatches';
import validateJWT from '../middlewares/tokenVali';

const routM = Router();

const controllerMatches = new ControllerMatches();

routM.get('/matches', (req, res) => controllerMatches.getMatches(req, res));
routM.post('/matches', validateJWT, (req, res) => controllerMatches.createMatches(req, res));
routM.patch('/matches/:id', validateJWT, (req, res) =>
  controllerMatches.updateMatchesGoals(req, res));
routM.patch('/matches/:id/finish', validateJWT, (req, res) =>
  controllerMatches.updateMatchesFinish(req, res));

export default routM;
