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

  public async updateMatchesFinish(req: Request, res: Response) {
    const matchId = req.params.id;
    const trueId = Number(matchId);
    const response = await this.serviceT.updateMatchesFinish(trueId);
    return res.status(200).json(response);
  }

  public async updateMatchesGoals(req: Request, res: Response) {
    const matchId = req.params.id;
    const trueId = Number(matchId);
    const updated = req.body;
    const response = await this.serviceT.updateMatchesGoals(trueId, updated);
    return res.status(200).json(response);
  }

  public async createMatches(req: Request, res: Response) {
    const matches = req.body;
    const { homeTeamId, awayTeamId } = matches;
    console.log(homeTeamId === awayTeamId);

    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const response = await this.serviceT.createMatches(matches);
    if (!response) return res.status(404).json({ message: 'There is no team with such id!' });
    console.log(response);

    return res.status(201).json(response);
  }
}

export default controllerMatches;
