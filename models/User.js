const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static initModel(sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        firstname: {
          type: DataTypes.STRING,
        },
        lastname: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        avatar: {
          type: DataTypes.STRING,
        },
        username: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },
        birthdayDate: {
          type: DataTypes.DATE,
        },
        description: {
          type: DataTypes.TEXT,
        },
      },
      {
        sequelize,
        modelName: "user",
      },
    );
    return User;
  }
}

module.exports = User;
