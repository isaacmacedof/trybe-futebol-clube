export type Matches = {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean
};

export type Finished = {
  message: string,
};

export type Goals = {
  homeTeamGoals: number,
  awayTeamGoals: number,
};

export type CreateMatchesType = {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
};
