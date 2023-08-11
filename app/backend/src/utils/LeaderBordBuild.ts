import { Matches } from '../types/Matches';

export default class LeaderBordBuild {
  private matches: Matches[];
  private teamId: number;
  private side: 'home' | 'away' | 'all';

  constructor(matches: Matches[], teamId: number, side: 'home' | 'away' | 'all') {
    this.matches = matches;
    this.teamId = teamId;
    this.side = side;
  }

  private filterMatchesBuild(): Matches[] {
    if (this.side === 'home') {
      return this.matches.filter((matches) => matches.homeTeamId === this.teamId);
    }
    if (this.side === 'away') {
      return this.matches.filter((matches) => matches.awayTeamId === this.teamId);
    }
    return this.matches.filter((matches) => matches.homeTeamId === this.teamId
      || matches.awayTeamId === this.teamId);
  }

  get totalPoints(): number {
    const filter = this.filterMatchesBuild();

    return filter.reduce((total, matches) => {
      const isWin = (this.side === 'home' && matches.homeTeamGoals > matches.awayTeamGoals)
        || (this.side === 'away' && matches.awayTeamGoals > matches.homeTeamGoals);
      const isMatchDrawn = matches.homeTeamGoals === matches.awayTeamGoals;

      if (isWin) {
        return total + 3;
      } if (isMatchDrawn) {
        return total + 1;
      }

      return total;
    }, 0);
  }

  get totalVictories(): number {
    const filter = this.filterMatchesBuild();

    return filter.reduce((total, matches) => {
      const isWin = (this.side === 'home' && matches.homeTeamGoals > matches.awayTeamGoals)
        || (this.side === 'away' && matches.awayTeamGoals > matches.homeTeamGoals);

      return total + (isWin ? 1 : 0);
    }, 0);
  }

  get totalDraws(): number {
    const filter = this.filterMatchesBuild();

    return filter.reduce((total, matches) => {
      const isDrawn = matches.homeTeamGoals === matches.awayTeamGoals;

      return total + (isDrawn ? 1 : 0);
    }, 0);
  }

  get totalLosses(): number {
    const filter = this.filterMatchesBuild();

    return filter.reduce((total, matches) => {
      const isLosser = (this.side === 'home' && matches.homeTeamGoals < matches.awayTeamGoals)
        || (this.side === 'away' && matches.awayTeamGoals < matches.homeTeamGoals);

      return total + (isLosser ? 1 : 0);
    }, 0);
  }

  get goalsFavor(): number {
    const filter = this.filterMatchesBuild();

    return filter.reduce((total, matches) => {
      if (this.side === 'home') {
        return total + matches.homeTeamGoals;
      }
      return total + matches.awayTeamGoals;
    }, 0);
  }

  get goalsOwn(): number {
    const filter = this.filterMatchesBuild();

    return filter.reduce((total, matches) => {
      if (this.side === 'home') {
        return total + matches.awayTeamGoals;
      }
      return total + matches.homeTeamGoals;
    }, 0);
  }

  get goalsBalance(): number {
    return this.goalsFavor - this.goalsOwn;
  }

  get efficiency(): number {
    const filter = this.filterMatchesBuild();
    const mP = filter.length * 3;
    const aP = this.totalPoints;

    return +((100 / mP) * aP).toFixed(2);
  }
}
