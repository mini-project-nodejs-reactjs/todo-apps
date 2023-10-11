"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      board.hasMany(models.todo);
    }
  }
  board.init(
    {
      boardName: DataTypes.STRING,
      backgroundImg: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "board",
    }
  );
  return board;
};
