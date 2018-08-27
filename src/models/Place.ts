import Point = google.maps.Point;
import Geometry = google.maps.Data.Geometry;

export class Place {

  geometry: Geometry;
  point: Point;
  name: String;
  distance: number;
}
