const closestPoint = require('./linearClosestPoint');

module.exports = function (line, stations) {

	let bestPoint,
		snappedPoints = [],
		numberOfStations = stations.length;

	for (var i = 0; i < numberOfStations; i++) {
		let station = stations[i];
		let bestDistance = Infinity;
		for (var j = 0; j < line.length; j++) {
			let closestPoint = closestPoint(line[j], line[j+1], station)
			if (closestPoint.distance < bestDistance) {
				bestDistance = closestPoint.distance;
				bestPoint = closestPoint.point;
			}
		}
		snappedPoints.push(bestPoint);
	}

	// @mbrocks todo; determine how to clip line to end at closestPoint for each terminus station
	return snappedPoints;
}

