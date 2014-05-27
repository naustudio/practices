/*  snake_server.js
 *
 *  Multisnake server implementation
 *  Does matchmaking and passes messages between player clients
 *
 *  Dependencies:
 *      ../shared/config.js
 *      ../shared/comm_names.js
 *      ./events.js
 *      ./matchup.js
 */

var config = require('../shared/config.js');
var msgs = require('../shared/comm_names.js').msgs;
var params = require('../shared/comm_names.js').params;
var Events = require('./events.js');
var Matchup = require('./matchup.js').Matchup;

/* a matchup waiting for more players */
var waiting_matchup = new Matchup();

/* all matchups playing */
var playing_matchups = [];

/* maps all sockets to Matchups */
var socket_matchups = {};

// Setup basic express server
var express = require('express');
var app = express();
var http = require('http');
var server;
var io;
var port = process.env.PORT || 8080;
var path = require('path');

app.configure(function () {
	app.set('port', port);
	app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
	app.use(express.bodyParser());
	app.use(express.static(path.join(__dirname, '../')));
});

server = require('http').createServer(app);


server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {
	var address = socket.handshake.address;
	console.log('someone connected from ' + address.address);

	socket.on('disconnect', function() {
		console.log('someone left');

		var matchup = socket_matchups[socket];
		if (matchup)
			matchup.disconnect(socket);
	});

	socket.on(msgs.TURN, function(data) {
		var matchup = socket_matchups[socket];
		if (matchup)
			matchup.turned(socket, data[params.DIR],
				data[params.COORDS], data[params.TICK]);

		Events.ping(socket, data[params.TIME]);
	});

	socket.on(msgs.JOIN, function(data) {
		waiting_matchup.addPlayer(socket);
		socket_matchups[socket] = waiting_matchup;

		if (waiting_matchup.isFull()) {
			playing_matchups.push(waiting_matchup);
			waiting_matchup = new Matchup();
		}

		Events.ping(socket, data[params.TIME]);
	});

	socket.on(msgs.END_GAME, function(data) {
		var matchup = socket_matchups[socket];

		if (matchup) {
			for (var i in matchup.playersocks()) {
				var sock = matchup.playersocks()[i];
				delete socket_matchups[sock];
			}

			if (matchup)
				matchup.endGame(data[params.FAIL_PLAYERS]);
		}
	});

	socket.on(msgs.NEW_FOOD, function(data) {
		var matchup = socket_matchups[socket];

		if (matchup) {
			matchup.broadcastFood(data[params.X], data[params.Y]);
		}
	});
});
