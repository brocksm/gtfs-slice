CREATE TEMP TABLE MergedRoutes
AS 
  SELECT
    route_id,
    route_id AS merged_route_id
  FROM routes
