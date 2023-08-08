import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class TeamsModel extends Model<InferAttributes<TeamsModel>,
InferCreationAttributes<TeamsModel>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

TeamsModel.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    field: 'team_name',
    allowNull: false,
  },
}, {
  modelName: 'Teams',
  sequelize: db,
  timestamps: false,
  underscored: true,
});

export default TeamsModel;
