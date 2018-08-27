import {Injectable} from "@angular/core";
import {Ride} from "../models/Ride";
import {Observable} from "rxjs/Observable";
import {ApiService} from "./http/api.service";

@Injectable()
export class RideService {
  constructor(public apiHttp: ApiService){}

  createRide(ride: Ride) {
    return this.apiHttp.post('rides', ride);
  }

  getRideById(id: string): Observable<Ride> {
    return this.apiHttp.get('rides/' + id);
  }

  getPartnersRide(id: string): Observable<[Ride]> {
    return this.apiHttp.get('rides?rideId=' + id);
  }
}
