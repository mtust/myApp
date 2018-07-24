import {Ride} from "./Ride";

export class User {
  id: string;

  facebookId: string;
  name: string;
  surname: string;
  photo: Blob;

  historicalRides: Array<Ride>;
  activeRide: Ride;
}
