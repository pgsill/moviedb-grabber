'use strict';

// ==========================
// req the packages we need =
// ==========================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan		= require('morgan');
var mongoose    = require('mongoose');
var path = require('path');
var request = require('request');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User   = require('./app/models/user'); // get our mongoose model

app.use(express.static(path.join(__dirname, 'static')));

// =======================
// configuration 		 =
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =========================
// MovieDB API routes      =
// =========================

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

// =============================
// authentication routes =
// =============================

// get an instance of the router for auth routes
var apiRoutes = express.Router(); 

apiRoutes.use('/create-user', function(req, res) {

  // create a sample user
  var nick = new User({ 
	name: 'Nick Cerminara', 
	password: 'password',
	admin: true 
  });

  // save the sample user
  nick.save(function(err) {
	if (err) throw err;

	console.log('User saved successfully');
	res.json({ success: true });
  });
});

// route to authenticate a user (POST http://localhost:8080/auth/authenticate)
apiRoutes.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
	name: req.body.name
  }, function(err, user) {

	if (err) throw err;

	if (!user) {
	  res.json({ success: false, message: 'Authentication failed. User not found.' });
	} else if (user) {

	  // check if password matches
	  if (user.password != req.body.password) {
		res.json({ success: false, message: 'Authentication failed. Wrong password.' });
	  } else {

		// if user is found and password is right
		// create a token
		var token = jwt.sign(user, app.get('superSecret'), {
		  expiresIn: 1440 // expires in 24 hours
		});

		// return the information including token as JSON
		res.json({
		  success: true,
		  message: 'Enjoy your token!',
		  token: token
		});
	  }   

	}

  });
});

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

	// verifies secret and checks exp
	jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
	  if (err) {
		return res.json({ success: false, message: 'Failed to authenticate token.' });    
	  } else {
		// if everything is good, save to request for use in other routes
		req.decoded = decoded;    
		next();
	  }
	});

  } else {

	// if there is no token
	// return an error
	return res.status(403).send({ 
		success: false, 
		message: 'No token provided.' 
	});

  }
});

// route to show a random message (GET http://localhost:8080/auth/)
apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to authentication API!' });
});

// route to return all users (GET http://localhost:8080/auth/users)
apiRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
	res.json(users);
  });
});   

// apply the routes to our application with the prefix /auth
app.use('/auth', apiRoutes);


// =======================
// start the server      =
// starts on var port    =
// =======================

var server = app.listen(port);

module.exports = server;