import TeamsModel from '../database/models/teams.model';
import { Teams } from '../types/Teams';

class serviceTeams {
  private model = TeamsModel;
  public async getTeams(): Promise<Teams[]> {
    const teams = await this.model.findAll();
    return teams;
  }
}

export default serviceTeams;
