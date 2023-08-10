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

  public async getOneTeam(req: Request, res: Response) {
    const { id } = req.params;
    const response = await this.serviceT.getOneTeam(Number(id));
    if (response === null) return res.status(404).json({ message: '"id" not found' });
    return res.status(200).json(response);
  }
}

export default controllerTeams;
