require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
let Sequelize = require('sequelize');

app.get('/', (req, res) => {
    let db = new Sequelize('dbUser', 'user', 'pass', {
        dialect: 'sqlite',
        storage: process.env.SQLITE_PATH,
        operatorsAliases: false
    });
    db.query(`select a.username, a.email, a.name
    from user a;`, {type: Sequelize.QueryTypes.SELECT}).then((data) => {
        res.json(data);
    });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))