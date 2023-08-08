import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import TeamsModel from './teams.model';

class MatchesModel extends Model<InferAttributes<MatchesModel>,
InferCreationAttributes<MatchesModel>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'teams' },
    field: 'home_team_id',
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'teams' },
    field: 'away_team_id',
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
  },
}, {
  sequelize: db,
  modelName: 'trybeEval',
  timestamps: false,
});

MatchesModel.belongsTo(MatchesModel, { foreignKey: 'home_team_id', as: 'homeTeam' });
MatchesModel.belongsTo(MatchesModel, { foreignKey: 'away_team_id' as 'awayTeamId' });
MatchesModel.hasMany(TeamsModel, { foreignKey: 'home_team_id' as 'homeTeam' });
MatchesModel.hasMany(TeamsModel, { foreignKey: 'away_team_id' as 'awayTeamId' });

export default MatchesModel;
