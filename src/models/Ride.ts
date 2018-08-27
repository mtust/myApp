import {Place} from "./Place";
import {User} from "./User";

export class Ride{
  id: String;

  date: Date;
  placeFrom: Place;
  placeTo: Place;
  isActive: boolean;
  user: User;

}
