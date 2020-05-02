module.exports = function(sequelize, DataTypes) {
  var Answers = sequelize.define("answers", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    id_question: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    answer: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    is_right:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
  });
  return Answers;
};