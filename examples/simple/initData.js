require('dotenv').config();
let Sequelize = require('sequelize');

let db = new Sequelize('dbUser', 'user', 'pass', {
    dialect: 'sqlite',
    storage: process.env.SQLITE_PATH,
    operatorsAliases: false
});
const User = db.define('user', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    username: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    }
}, {
    tableName: "user"
});
  
// force: true will drop the table if it already exists
User.sync({force: true}).then(() => {
    // Table created
    return User.bulkCreate([{
        username: "johndoe",
        email: "johndoe@email.com",
        name: "John Doe",
    }, {
        username: "lukeskywalker",
        email: "lukeskywalker@email.com",
        name: "Luke Skywalker",
    }, {
        username: "anakinskywalker",
        email: "anakinskywalker@email.com",
        name: "Anakin Skywalker",
    }, {
        username: "obiwankenobi",
        email: "obiwankenobi@email.com",
        name: "Obi Wan Kenobi",
    }, {
        username: "jonathanjoestar",
        email: "jonathanjoestar@email.com",
        name: "Jonathan Joestar",
    }, {
        username: "josephjoestar",
        email: "josephjoestar@email.com",
        name: "Joseph Joestar",
    }]);
});