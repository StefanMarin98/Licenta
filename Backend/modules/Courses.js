module.exports = function(sequelize, DataTypes) {
  var Courses = sequelize.define("courses", {
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
  return Courses;
};