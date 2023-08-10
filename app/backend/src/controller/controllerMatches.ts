import { Request, Response } from 'express';
import ServiceMatches from '../service/serviceMatches';

class controllerMatches {
  constructor(
    private serviceT = new ServiceMatches(),
  ) { }

  public async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    let isMatchInProgress: boolean;
    if (typeof inProgress === 'string') {
      isMatchInProgress = inProgress === 'true';
    } else {
      isMatchInProgress = false;
    }
    if (inProgress) {
      const response = await this.serviceT.getMatchesFiltred(isMatchInProgress);
      return res.status(200).json(response);
    }

    const response = await this.serviceT.getMatches();
    return res.status(200).json(response);
  }

  // public async getMatchesFiltred(req: Request, res: Response) {
  //   const { inProgress } = req.query;
  //   let isMatchInProgress: boolean;
  //   if (typeof inProgress === 'string') {
  //     isMatchInProgress = inProgress === 'true';
  //   } else {
  //     isMatchInProgress = false;
  //   }
  //   const response = await this.serviceT.getMatchesFiltred(isMatchInProgress);
  //   return res.status(200).json(response);
  // }
}

export default controllerMatches;
