CREATE TEMP TABLE network
AS 
  WITH 
    FilteredRoutes AS (
      SELECT DISTINCT
        route_id,
        route_type,
        route_color
      FROM routes
      WHERE TRUE
    ),
    CountOfStopsByTripId AS (
      SELECT
        trips.route_id,
        trips.shape_id,
        trips.trip_id,
        COUNT(DISTINCT stop_times.stop_id) AS count_of_stops
      FROM FilteredRoutes
      INNER JOIN trips USING (route_id)
      INNER JOIN stop_times USING (trip_id)
      GROUP BY 1, 2, 3
    ),
    CountOfStopsByShapeId AS (
      SELECT
        trips.route_id,
        trips.shape_id,
        COUNT(DISTINCT stop_times.stop_id) AS count_of_stops
      FROM FilteredRoutes
      INNER JOIN trips USING (route_id)
      INNER JOIN stop_times USING (trip_id)
      GROUP BY 1, 2
    ), 
    FilteredTrips AS (
      -- Filtering the list of trips to include only those
      -- that contain every stop on the shape ensures that the
      -- field used to sort the stops, stop_times.stop_sequence, is 
      -- comprehensive of all stops on the shape, and not specific
      -- to a trip that only contains a subset of the stops.
      -- This assumes that there is at least one trip_id that runs on
      -- each shape_id that stops at every stop.
      SELECT route_id, shape_id, trip_id
      FROM CountOfStopsByTripId
      INNER JOIN CountOfStopsByShapeId USING (route_id, shape_id)
      WHERE CountOfStopsByTripId.count_of_stops = CountOfStopsByShapeId.count_of_stops
    ),
    Main AS (
      SELECT
        *,
        RANK() 
          OVER (PARTITION BY shape_id ORDER BY stop_sequence) AS stop_order
      FROM (    		
        SELECT DISTINCT
          routes.route_type,
          routes.route_color,
          IFNULL(
            merged_routes.route_id,
            trips.route_id) AS route_id,
          trips.shape_id,
          stops.parent_station,
          stops.stop_id,
          stops.stop_name,
          stop_times.stop_sequence,
          stops.stop_lon,
          stops.stop_lat
        FROM FilteredRoutes AS routes
        LEFT JOIN MergedRoutes AS merged_routes USING(route_id)
        INNER JOIN FilteredTrips AS trips USING (route_id)
        INNER JOIN stop_times USING (trip_id)
        INNER JOIN stops USING (stop_id)
      )
    ),
    EndPoints AS (
      SELECT
        route_id, 
        parent_station,
        SUM(stop_order = 1 OR stop_order = max_stop_order)
          = COUNT(shape_id) AS is_endpoint
      FROM (    		
        SELECT
          route_id,
          shape_id,
          parent_station,
          stop_order,				
          MAX(stop_order) 
            OVER (PARTITION BY shape_id) AS max_stop_order
        FROM Main
        GROUP BY 1, 2, 3, 4
      )
      GROUP BY 1, 2
    )	
  SELECT
    Main.*,
    EndPoints.is_endpoint,
    PriorStop.stop_id AS prior_stop_id,
    NextStop.stop_id AS next_stop_id
  FROM Main
  INNER JOIN EndPoints USING (route_id, parent_station)
  LEFT JOIN Main AS PriorStop
    ON Main.route_id = PriorStop.route_id
    AND Main.shape_id = PriorStop.shape_id
    AND Main.stop_order - 1 = PriorStop.stop_order
  LEFT JOIN Main AS NextStop
    ON Main.route_id = NextStop.route_id
    AND Main.shape_id = NextStop.shape_id
    AND Main.stop_order + 1 = NextStop.stop_order
  ORDER BY Main.route_id, Main.shape_id, Main.stop_order