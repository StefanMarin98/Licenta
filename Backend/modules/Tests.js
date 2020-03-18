module.exports = function(sequelize, DataTypes) {
  var Tests = sequelize.define("tests", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Tests;
};