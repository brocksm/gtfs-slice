module.exports = {
	name: 'stops',
	mapHeaders: ({header, index}) => {
		const headers = [
			'stop_id', 'stop_name', 'parent_station', 
			'stop_lat', 'stop_lon'
		];
		return headers.includes(header) ? header : null;
	},
	mapValues: ({header, index, value}) => {
		const numbers = [
			'stop_lat', 'stop_lon'
		];
		return numbers.includes(header) ? Number(value) : value;
	},
	schema: [
		{
			name: 'stop_id',
			type: 'TEXT',
			constraint: true
		},
		{
			name: 'stop_name',
			type: 'TEXT'
		},
		{
			name: 'parent_station',
			type: 'TEXT'
		},
		{
			name: 'stop_lat',
			type: 'REAL'
		},
		{
			name: 'stop_lon',
			type: 'REAL'
		}
	]
}