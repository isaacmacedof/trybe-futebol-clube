import { Router } from 'express';
import validateJWT from '../middlewares/tokenVali';
import loginVali from '../middlewares/middleLogin';
import ControllerLogin from '../controller/controllerLogin';

const routL = Router();

const ControlLogin = new ControllerLogin();

routL.post('/login', loginVali.valiLogin, (req, res) => ControlLogin.getToken(req, res));
routL.get('/login/role', validateJWT, (req, res) => ControlLogin.getRole(req, res));

export default routL;
