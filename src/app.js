const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	res.send(`get user/ </br>
  get users/ </br>
  post users/ </br>
  delete users/ </br>
  patch users/ </br>
  `);
});

app.use(routes);

const port = 3000;
app.listen(port, function () {
	console.log('Express server listening on port ' + port);
});
