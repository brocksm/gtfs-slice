module.exports = function (query, types, routes) {
  let whereStatement = 'WHERE ';
  let multiStatement = false;
  // excluded objects are denoted with a '^-%' per commander help
  const includedTypes = types.filter(t => !t.startsWith('-'));
  const excludedTypes = types.filter(t => t.startsWith('-'))
    .map((t, i, a) => a[i] = a[i].replace('-', ''));
  const includedRoutes = routes.filter(r => !r.startsWith('-'));
  const excludedRoutes = routes.filter(r => r.startsWith('-'))
    .map((r, i, a) => a[i] = a[i].replace('-', ''));

  if (types.length && routes.length) {
    multiStatement = true;
    includedTypes.length ? 
      buildStatement(whereStatement, 'route_type', includedTypes, true) :
      buildStatement(whereStatement, 'route_type', excludedTypes, false);

    includedRoutes.length ?
      buildStatement(whereStatement, 'route_id', includedRoutes, true) :
      buildStatement(whereStatement, 'route_id', excludedRoutes, false);    
  }  
  else if (types.length) {
    includedTypes.length ? 
      buildStatement(whereStatement, 'route_type', includedTypes, true) :
      buildStatement(whereStatement, 'route_type', excludedTypes, false);
  }

  else if (routes.length) {
    includedRoutes.length ?
      buildStatement(whereStatement, 'route_id', includedRoutes, true) :
      buildStatement(whereStatement, 'route_id', excludedRoutes, false);    
  }

  else {whereStatement += 'TRUE'}

  query.replace('WHERE TRUE', whereStatement);

  function buildStatement (text, field, values, inclusiveFlag) {
    text += `${field}`;
    text += inclusiveFlag ? ' IN ' : ' NOT IN ';
    text += `(${values.join(',')})`;
    text += multiStatement ? ' AND ' : '';
  }
}

