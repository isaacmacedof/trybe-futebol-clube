import { DataTypes, Model, QueryInterface } from 'sequelize';
import { Matches } from '../../types/Matches';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Matches>>('matches', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      homeTeamId: {
        type: DataTypes.INTEGER,
        field: "home_team_id",
        allowNull: false,
      },
      homeTeamGoals: {
        type: DataTypes.INTEGER,
        field: "home_team_goals",
        allowNull: false,
      },
      awayTeamId: {
        type: DataTypes.INTEGER,
        field: "away_team_id",
        allowNull: false,
      },
      awayTeamGoals: {
        type: DataTypes.INTEGER,
        field: "away_team_goals",
        allowNull: false,
      },
      inProgress: {
        type: DataTypes.BOOLEAN,
        field: "in_progress",
        allowNull: false,
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  }
};
