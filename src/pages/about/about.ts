import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {Ride} from "../../models/Ride";
import {RideService} from "../../services/RideService";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage{

  constructor(public navCtrl: NavController, private rideService: RideService) {
  }

  rides: Array<Ride> = [];
  jsonRides;

  findRide() {
    this.rideService.getRideById("5a32c0979f78370829115b3c").subscribe(rides => {this.rides = rides});
    this.jsonRides = JSON.stringify(this.rides);
  }

}
