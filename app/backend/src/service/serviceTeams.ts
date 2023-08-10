import TeamsModel from '../database/models/teams.model';
import { Teams } from '../types/Teams';

class serviceTeams {
  private model = TeamsModel;
  public async getTeams(): Promise<Teams[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  public async getOneTeam(id: number): Promise<Teams | null> {
    const team = await this.model.findByPk(id);
    return team;
  }
}

export default serviceTeams;
