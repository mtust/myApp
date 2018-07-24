import {DateTime} from "ionic-angular";
import Point = google.maps.Point;
import {Place} from "./Place";
import {User} from "./User";

export class Ride{
  id: String;

  date: DateTime;
  pointFrom: Point;
  pointTo: Point;
  distanceTo: number;
  distanceFrom: number;
  placeFrom: Place;
  placeTo: Place;
  isActive: boolean;
  user: User;

}
