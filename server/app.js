const express = require('express');
const path = require('path');
const app = express();
const webRoute = require('./routes/web.js').default;
const apiRoute = require('./routes/api.js').default;

app.use('/public', express.static(path.join(__dirname, '../public')))

webRoute(app);
apiRoute(app, '/api');

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});