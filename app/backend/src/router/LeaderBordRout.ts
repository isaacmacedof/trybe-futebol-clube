import { Router } from 'express';
import ControllerLeader from '../controller/controllerLeaderBords';

const leaderController = new ControllerLeader();
const routLeader = Router();

routLeader.get('/leaderboard/home', (req, res) => leaderController.findHomeLeaderboard(req, res));
routLeader.get('/leaderboard/away', (req, res) => leaderController.findAwayLeaderboard(req, res));

export default routLeader;
