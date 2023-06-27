"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Music extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Music.belongsTo(models.User);
    }
  }
  Music.init(
    {
      name: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      price: DataTypes.INTEGER,
      spotifyId: DataTypes.STRING,
      artistName: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Music",
    }
  );
  Music.addHook("beforeCreate", (instance) => {
    instance.status = false;
  });
  return Music;
};
