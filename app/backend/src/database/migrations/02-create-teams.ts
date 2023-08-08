import { DataTypes, Model, QueryInterface } from 'sequelize';
import { Teams } from '../../types/Teams';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Teams>>('teams', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      teamName: {
        type: DataTypes.STRING,
        field: "team_name",
        allowNull: false,
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('teams');
  }
};
