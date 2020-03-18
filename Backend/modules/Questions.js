module.exports = function(sequelize, DataTypes) {
  var Questions = sequelize.define("questions", {
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
    question: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Questions;
};