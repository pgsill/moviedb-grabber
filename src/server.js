'use strict';

var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});


var server = app.listen(8080);

module.exports = server;
