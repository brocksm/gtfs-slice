module.exports = function (query, routeList) {
  if (!routeList.length) return query;

  let caseStatement = 'CASE';

  for (let i = 0; i < routeList.length; i++) {
    let comparison = routeList[i][0].includes('%') ? ' LIKE ' : ' = ',
        routeId = routeList[i][0],
        mergedRouteId = routeList[i][1];
    caseStatement + ' \n';
    caseStatement + 'WHEN route_id' + comparison + route_id;
    caseStatement + ' THEN ' + mergedRouteId;
  }
  caseStatement += '\n END AS';
  query.replace('route_id AS', caseStatement)

  return query;
}