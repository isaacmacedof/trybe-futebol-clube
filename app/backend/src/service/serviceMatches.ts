import MatchesModel from '../database/models/matches.model';
import TeamsModel from '../database/models/teams.model';
import { Matches, Finished, Goals } from '../types/Matches';

class serviceMatches {
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

  public async updateMatchesFinish(id: number): Promise<Finished> {
    await this.model.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  }

  public async updateMatchesGoals(id: number, updated: Goals): Promise<Finished | null> {
    const { homeTeamGoals, awayTeamGoals } = updated;
    const thisMatches = await this.model.findByPk(id);
    if (!thisMatches) return null;
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    thisMatches.awayTeamGoals = awayTeamGoals;
    thisMatches.homeTeamGoals = homeTeamGoals;
    return { message: 'Finished' };
  }
}

export default serviceMatches;
