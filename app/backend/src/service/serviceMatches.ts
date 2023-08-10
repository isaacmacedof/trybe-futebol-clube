import MatchesModel from '../database/models/matches.model';
import TeamsModel from '../database/models/teams.model';
import { Matches } from '../types/Matches';

class serviceTeams {
  private model = MatchesModel;
  public async getMatches(): Promise<Matches[]> {
    const matches = await this.model.findAll({
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [
        { model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  public async getMatchesFiltred(inProgress: boolean): Promise<Matches[]> {
    const matches = await this.model.findAll({
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [
        { model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
      where: { inProgress },
    });
    return matches;
  }
}

export default serviceTeams;
