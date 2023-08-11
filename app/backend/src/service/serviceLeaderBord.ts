import { status, leaderboardData } from '../types/LeaderBord';
import ServiceMatches from './serviceMatches';
import ServiceTeams from './serviceTeams';
import LeaderBordBuild from '../utils/LeaderBordBuild';

export default class ServiceLeader {
  constructor(
    private serviceT = new ServiceMatches(),
    private serviceTeam = new ServiceTeams(),
  ) {}

  private _lb: status[] = [];
  private data = {} as leaderboardData;

  async getHS(): Promise<status[]> {
    this._lb = await this.getHLB();
    return this.sort();
  }

  async getAS(): Promise<status[]> {
    this._lb = await this.getALB();
    return this.sort();
  }

  private async getHLB(): Promise<status[]> {
    const { matches, teams } = await this.getData();

    return teams.map((t) => {
      const homeStats = matches.filter((match) => t.id === match.homeTeamId);
      const Builder = new LeaderBordBuild(homeStats, t.id, 'home');
      return {
        name: t.teamName,
        totalPoints: Builder.totalPoints,
        totalGames: homeStats.length,
        totalVictories: Builder.totalVictories,
        totalDraws: Builder.totalDraws,
        totalLosses: Builder.totalLosses,
        goalsFavor: Builder.goalsFavor,
        goalsOwn: Builder.goalsOwn,
        goalsBalance: Builder.goalsBalance,
        efficiency: Builder.efficiency,
      };
    });
  }

  private async getALB(): Promise<status[]> {
    const { matches, teams } = await this.getData();

    return teams.map((t) => {
      const awayStats = matches.filter((match) => t.id === match.awayTeamId);
      const Builder = new LeaderBordBuild(awayStats, t.id, 'away');
      return {
        name: t.teamName,
        totalPoints: Builder.totalPoints,
        totalGames: awayStats.length,
        totalVictories: Builder.totalVictories,
        totalDraws: Builder.totalDraws,
        totalLosses: Builder.totalLosses,
        goalsFavor: Builder.goalsFavor,
        goalsOwn: Builder.goalsOwn,
        goalsBalance: Builder.goalsBalance,
        efficiency: Builder.efficiency,
      };
    });
  }

  private async getData(): Promise<leaderboardData> {
    this.data = {
      matches: await this.serviceT.getMatchesFiltred(false),
      teams: await this.serviceTeam.getTeams(),
    };
    return this.data;
  }

  private sort(): status[] {
    const p: (keyof status)[] = [
      'totalPoints', 'totalVictories', 'goalsBalance', 'goalsFavor',
    ];

    return this._lb.sort((a, b) => {
      const sorted = p.find((param) => a[param] !== b[param]) as keyof status;
      return +b[sorted] - +a[sorted];
    });
  }
}
