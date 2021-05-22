module.exports = {
	name: 'routes',
	mapHeaders: ({header, index}) => {
		const headers = [
			'route_id', 'route_type',
			'route_color', 'route_text_color'
		];
		return headers.includes(header) ? header : null;
	},
	mapValues: ({header, index, value}) => {
		return header === 'route_type' ? Number(value) : value;
	},
	schema: [
		{
			name: 'route_id',
			type: 'TEXT',
			constraint: true
		},
		{
			name: 'route_type',
			type: 'INTEGER',
			constraint: true
		},
		{
			name: 'route_color',
			type: 'TEXT'
		},
		{
			name: 'route_text_color',
			type: 'TEXT'
		}
	]
}