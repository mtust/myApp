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
  ride: Ride;
  jsonRides;

  findRide() {
    this.rideService.getRideById("5cf63f3875ad8209e2a01b3c").subscribe(ride => {this.rides.push(ride)});
    debugger;
    this.jsonRides = JSON.stringify(this.rides);
  }

}
