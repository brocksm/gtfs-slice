module.exports = {
	name: 'stop_times',
	mapHeaders: ({header, index}) => {
		const headers = [
			'trip_id', 'stop_id', 'stop_sequence'
		];
		return headers.includes(header) ? header : null;
	},
	mapValues: ({header, index, value}) => {
		return value;
	},
	schema: [
		{
			name: 'trip_id',
			type: 'TEXT',
			constraint: true
		},
		{
			name: 'stop_id',
			type: 'TEXT',
			constraint: true
		},
		{
			name: 'stop_sequence',
			type: 'INTEGER'
		}
	]
}