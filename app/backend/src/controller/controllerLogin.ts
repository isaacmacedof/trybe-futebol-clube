import { Request, Response } from 'express';
import ServiceLogin from '../service/serviceLogin';

class controllerLogin {
  constructor(
    private serviceT = new ServiceLogin(),
  ) { }

  public async getToken(req: Request, res: Response) {
    const user = req.body;
    const response = await this.serviceT.login(user);
    if (response === null) return res.status(401).json({ message: 'Invalid email or password' });
    return res.status(200).json(response);
  }
}

export default controllerLogin;
