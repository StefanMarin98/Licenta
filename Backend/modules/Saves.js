module.exports = function(sequelize, DataTypes) {
  var Saves = sequelize.define("saves", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    id_test: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    result: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Saves;
};