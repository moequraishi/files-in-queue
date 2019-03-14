const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./server/routes/routes');
const app = express();
const port = 1337;

app.set('dist', path.join(__dirname, 'dist/inqueue'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: false} ));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/inqueue')));
app.use(routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/inqueue/index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
