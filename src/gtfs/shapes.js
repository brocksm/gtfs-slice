module.exports = {
	name: 'shapes',
	mapHeaders: ({header, index}) => {
		const headers = [
			'shape_id', 'shape_pt_sequence',
			'shape_pt_lat', 'shape_pt_lon'
		];
		return headers.includes(header) ? header : null;
	},
	mapValues: ({header, index, value}) => {
		const numbers = [
			'shape_pt_sequence', 'shape_pt_lat', 'shape_pt_lon'
		];
		return numbers.includes(header) ? Number(value) : value;
	},
	schema: [
		{
			name: 'shape_id',
			type: 'TEXT',
			constraint: true
		},
		{
			name: 'shape_pt_sequence',
			type: 'INTEGER',
			constraint: true
		},
		{
			name: 'shape_pt_lat',
			type: 'REAL'
		},
		{
			name: 'shape_pt_lon',
			type: 'REAL'
		}
	]
}