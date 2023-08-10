import { Router } from 'express';
import loginVali from '../middlewares/middleLogin';
import ControllerLogin from '../controller/controllerLogin';

const routL = Router();

const ControlLogin = new ControllerLogin();

routL.post('/login', loginVali.valiLogin, (req, res) => ControlLogin.getToken(req, res));

export default routL;
