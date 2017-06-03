'use strict';

// ==========================
// req the packages we need =
// ==========================
var express		= require('express');
var app 		= express();
var bodyParser	= require('body-parser');
var morgan		= require('morgan');
var path 		= require('path');
var request 	= require('request');

const TMDB_API_KEY = YOUR_THE_MOVIE_DATABASE_API_KEY_GOES_HERE;

app.use(express.static(path.join(__dirname, 'static')));

// =======================
// configuration 		 =
// =======================
var port = process.env.PORT || 8080; 

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// ======================
// MovieDB API routes	=
// ======================

app.get('/', (req, res) => {
	res.sendFile('index.html');
});
app.get('/api/mdb', (req, res) => {
	request('https://api.themoviedb.org/3/movie/550?api_key=' + TMDB_API_KEY, function (error, response, body) {
		console.log('error:', error); // Print the error if one occurred 
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
		res.json(body);
	})
});
app.get('/api/search/:query', (req, res) => {
	let query = req.params.query;

	request('https://api.themoviedb.org/3/movie/550?api_key=' + TMDB_API_KEY + '&query=' + query + '&language=en-US&page=1', function (error, response, body) {
		console.log('error:', error); // Print the error if one occurred 
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
		console.log(res.body);
		res.json(body);
	})
});
app.get('/api/popular', (req, res) => {
	request('https://api.themoviedb.org/3/movie/550?api_key=' + TMDB_API_KEY + '&language=en-US&page=1', function (error, response, body) {
		console.log('error:', error); // Print the error if one occurred 
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
		console.log(res.body);
		res.json(body);
	})
});
app.get('/api/movie/:id', (req,res) => {
	console.log(req.params.id);

	let id = req.params.id;

	let address = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + TMDB_API_KEY + '&language=en-US&append_to_response=videos,credits';

	request(address, function (error, response, body) {
		console.log('error:', error) // Print the error if one occurred 
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
		console.log(res.body);
		res.json(body);
	})
});


// ======================
// start the server		=
// ======================

var server = app.listen(port);

module.exports = server;