const routes = require('./routes');
const shapes = require('./shapes');
const stops = require('./stops');
const stop_times = require('./stop_times');
const trips = require('./trips');

module.exports = [
	routes,
	stops,
	stop_times,
	trips,
	shapes
];