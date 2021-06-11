const routes = require('./gtfs/routes');
const shapes = require('./gtfs/shapes');
const stops = require('./gtfs/stops');
const stop_times = require('./gtfs/stop_times');
const trips = require('./gtfs/trips');

module.exports = [
	routes,
	stops,
	stop_times,
	trips,
	shapes
];