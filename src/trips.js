module.exports = {
	name: 'trips',
	mapHeaders: ({header, index}) => {
		const headers = [
			'route_id', 'trip_id',
			'direction_id', 'shape_id'
		];
		return headers.includes(header) ? header : null;
	},
	mapValues: ({header, index, value}) => {
		const numbers = [
			'direction_id'
		];
		return numbers.includes(header) ? Number(value) : value;
	},
	schema: [
		{
			name: 'route_id',
			type: 'TEXT',
			constraint: true
		},
		{
			name: 'trip_id',
			type: 'TEXT',
			constraint: true
		},
		{
			name: 'shape_id',
			type: 'TEXT'
		},
		{
			name: 'direction_id',
			type: 'INTEGER'
		}
	]
}