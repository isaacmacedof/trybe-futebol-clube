import { Request, Response } from 'express';
import ServiceMatches from '../service/serviceMatches';

class controllerMatches {
  constructor(
    private serviceT = new ServiceMatches(),
  ) { }

  public async getMatches(_req: Request, res: Response) {
    const response = await this.serviceT.getMatches();
    return res.status(200).json(response);
  }

  // public async getMatchesFiltred(req: Request, res: Response) {
  //   const { inProgress } = req.query;
  //   const response = await this.serviceT.getMatchesFiltred(inProgress);
  //   return res.status(200).json(response);
  // }
}

export default controllerMatches;
