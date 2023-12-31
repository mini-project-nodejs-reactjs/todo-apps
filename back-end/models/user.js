"use strict";
const { encryptPwd } = require("../helpers/bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.todo);
      user.hasMany(models.board);
    }
  }
  user.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Invalid email format",
          },
          endsWithCom(value) {
            if (!value.endsWith(".com")) {
              throw new Error("Email must end with '.com'");
            }
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        // set(value) {
        //   this.setDataValue("password", encryptPwd(value));
        // },
      },
    },
    {
      hooks: {
        beforeCreate: function (user, options) {
          user.password = encryptPwd(user.password);
        },
        beforeUpdate: function (user, options) {
          if (user.changed("password")) {
            user.password = encryptPwd(user.password);
          }
        },
      },
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
