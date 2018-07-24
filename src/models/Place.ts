import {DateTime} from "ionic-angular";
import Geometry = google.maps.Data.Geometry;

export class Place {

  id: string;

  date: DateTime;
  geometry: Geometry;
  name: String;
  distance: number;
}
