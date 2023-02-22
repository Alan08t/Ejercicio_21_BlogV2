const { Model, DataTypes } = require("sequelize");

class Role extends Model {
  static initModel(sequelize) {
    Role.init(
      {
        role: {
          type: DataTypes.TEXT,
        },
      },
      {
        sequelize,
        modelName: "role",
      },
    );
    return Role;
  }
}

module.exports = Role;
