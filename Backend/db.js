const { database } = require("./config.json");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    database.name,
    database.user,
    database.password,
    {
        dialect: "mysql",
        host: database.host
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log("Database connection success!");
    })
    .catch(err => {
        console.log(`Database connection error: ${err}`);
    });
module.exports = sequelize;