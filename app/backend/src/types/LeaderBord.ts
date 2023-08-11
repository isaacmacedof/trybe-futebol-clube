import { Teams } from './Teams';
import { Matches } from './Matches';

interface IModelReader<T> {
  findAll?(): Promise<T[]>,
  findByPk?(id: number): Promise<T | null>,
  findOne?(data: Partial<T>): Promise<T | null>,
}

export type status = {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number
};

export type leaderboardData = {
  matches: Matches[],
  teams: Teams[],
};

export type MatchesLeader = {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
  homeTeam: { teamName: string },
  awayTeam: { teamName: string }
};

export interface Iboard extends IModelReader<status> {
  getTeamStats(): Promise<Matches[]>
}
