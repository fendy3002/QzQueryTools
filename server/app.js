const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const webRoute = require('./routes/web.js').default;
const apiRoute = require('./routes/api.js').default;

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, '../public')))
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

webRoute(app);
apiRoute(app, '/api');

process.on('uncaughtException', function (err) {
    console.log(err);
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});