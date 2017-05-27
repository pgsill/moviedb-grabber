'use strict';

var express = require('express');
var path = require('path');
var request = require('request');

var app = express();

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});
app.get('/mdb', (req, res) => {
	request('https://api.themoviedb.org/3/movie/550?api_key=***REMOVED***', function (error, response, body) {
	  console.log('error:', error); // Print the error if one occurred 
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
	  res.json(body);
	})
});
app.get('/popular', (req, res) => {
	request('https://api.themoviedb.org/3/movie/popular?api_key=***REMOVED***&language=en-US&page=1', function (error, response, body) {
	  console.log('error:', error); // Print the error if one occurred 
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
	  console.log(res.body);
	  res.json(body);
	})
});
app.get('/movie/:id', (req,res) => {
	console.log(req.params.id);

	let id = req.params.id;

	let address = "https://api.themoviedb.org/3/movie/" + id + "?api_key=***REMOVED***&language=en-US&append_to_response=videos,credits"

	request(address, function (error, response, body) {
	  console.log('error:', error) // Print the error if one occurred 
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
	  console.log(res.body);
	  res.json(body);
	})
})

var server = app.listen(8080);

module.exports = server;
