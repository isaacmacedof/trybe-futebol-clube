import { Request, Response } from 'express';
import ServiceLeader from '../service/serviceLeaderBord';

export default class ControllerLeader {
  constructor(private serviceLeader = new ServiceLeader()) {}

  async findHomeLeaderboard(req: Request, res: Response) {
    const response = await this.serviceLeader.getHS();
    return res.status(200).json(response);
  }

  async findAwayLeaderboard(req: Request, res: Response) {
    const response = await this.serviceLeader.getAS();
    return res.status(200).json(response);
  }
}
