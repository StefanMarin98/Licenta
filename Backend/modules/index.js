const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const db = {};
const basename = path.basename(module.filename);
const dbConfig = require('../config/db.json')

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    dialect: 'mysql',
    host: dbConfig.hostname,
    logging: false
})

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize
		.authenticate()
		.then(() => {
			console.log('Database connection has been established successfully.\n');
		})
		.catch((err) => {
      console.log('Unable to connect to the database.')
      console.log(err);
		});
		
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Users = require('./Users')(sequelize, Sequelize);
db.Saves = require('./Saves')(sequelize, Sequelize);
db.Tests = require('./Tests')(sequelize, Sequelize);
db.Questions = require('./Questions')(sequelize, Sequelize);
db.Answers = require('./Answers')(sequelize, Sequelize);
db.Courses = require('./Courses')(sequelize, Sequelize);

db.Users.hasMany(db.Saves, {
  foreignKey: 'id_user',
  onDelete: 'CASCADE'
})

db.Tests.hasMany(db.Saves, {
  foreignKey: 'id_test',
})
db.Tests.hasMany(db.Questions, {
    foreignKey: 'id_test'
})

db.Questions.hasMany(db.Answers, {
  foreignKey: 'id_question'
})

module.exports = db;