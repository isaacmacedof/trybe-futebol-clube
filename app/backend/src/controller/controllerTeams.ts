import { Request, Response } from 'express';
import ServiceTeams from '../service/serviceTeams';

class controllerTeams {
  constructor(
    private serviceT = new ServiceTeams(),
  ) { }

  public async getTeams(_req: Request, res: Response) {
    const response = await this.serviceT.getTeams();
    return res.status(200).json(response);
  }
}

export default controllerTeams;
