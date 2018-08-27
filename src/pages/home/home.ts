import {Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import {FormControl} from "@angular/forms";
import {MapsAPILoader} from "@agm/core";
import {Ride} from "../../models/Ride";
import {RideService} from "../../services/RideService";
import {Place} from "../../models/Place";

declare var google: any;

@Component({
  selector: 'page-home',
  styles: [`
    agm-map {
      height: 300px;
    }
  `],
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController, private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone, private rideService: RideService) {
  }

  @ViewChild("searchFrom")
  public searchElementRefFrom: ElementRef;
  @ViewChild("searchTo")
  public searchElementRefTo: ElementRef;

  public latitudeFrom: number;
  public longitudeFrom: number;
  public latitudeTo: number;
  public longitudeTo: number;
  public zoom: number;

  public searchControlFrom: FormControl;
  public searchControlTo: FormControl;

  public origin: {};
  public destination: {};

  public isValidFrom: boolean;
  public isValidTo: boolean;

  public myRide: Ride;


  ngOnInit() {
    this.isValidFrom = false;
    this.isValidTo = false;
    //create search FormControl
    this.searchControlFrom = new FormControl();
    this.searchControlTo = new FormControl();
    this.zoom = 30;

    this.mapsAPILoader.load().then(() => {
      this.setOriginFromCurrentLocation();
      let autocompleteFrom = new google.maps.places.Autocomplete(this.searchElementRefFrom.nativeElement, {
        types: ["address"]
      });
      autocompleteFrom.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocompleteFrom.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitudeFrom = place.geometry.location.lat();
          this.longitudeFrom = place.geometry.location.lng();
          this.isValidFrom = true;
          this.zoom = 30;
        });
      });
      let autocompleteTo = new google.maps.places.Autocomplete(this.searchElementRefTo.nativeElement, {
        types: ["address"]
      });
      autocompleteTo.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocompleteTo.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitudeTo= place.geometry.location.lat();
          this.longitudeTo = place.geometry.location.lng();
          this.isValidTo = true;
          this.zoom = 30;
        });
      });
    });
  }

  public findDirection() {
    this.getDirection(this.latitudeFrom, this.longitudeFrom, this.latitudeTo, this.longitudeTo);
  }

  public getDirection(latitudeFrom, longitudeFrom, latitudeTo, longitudeTo) {
    this.origin = { lat: latitudeFrom, lng: longitudeFrom};
    this.destination = { lat: latitudeTo, lng: longitudeTo}

  }

  public getCurrentLocation() {
    if (navigator)
    {
      navigator.geolocation.getCurrentPosition( pos => {
        this.longitudeFrom = pos.coords.longitude;
        this.latitudeFrom = pos.coords.latitude;
        this.getGeoLocation(this.latitudeFrom, this.longitudeFrom);
      });
    }
  }

  public setOriginFromCurrentLocation() {
    this.getCurrentLocation();
    this.origin = { lat: this.latitudeFrom, lng: this.longitudeFrom};
  }


  public getGeoLocation(lat, lng) {
    if (navigator.geolocation) {
      let geocoder = new google.maps.Geocoder();
      let latlng = new google.maps.LatLng(lat, lng);
      let request = { latLng: latlng };

      geocoder.geocode(request, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          let result = results[0];
          let rsltAdrComponent = result.address_components;
          let resultLength = rsltAdrComponent.length;
          if (result != null) {
            let address =  rsltAdrComponent[resultLength-7].short_name + ", " + rsltAdrComponent[resultLength-8].short_name + ", " + rsltAdrComponent[resultLength-5].short_name;
            this.searchControlFrom.setValue(address);
            this.isValidFrom = true;
          } else {
            console.warn("No address available!");
          }
        }
      });
    }
  }

  public createRide() {
    this.mapsAPILoader.load().then(() => {
      this.myRide = new Ride();
      this.myRide.isActive = true;
      this.myRide.placeFrom = new Place();
      this.myRide.placeFrom.point = new google.maps.Point(this.longitudeFrom, this.latitudeFrom);
      this.myRide.placeTo = new Place();
      this.myRide.placeTo.point = new google.maps.Point(this.longitudeTo, this.latitudeTo);
      this.rideService.createRide(this.myRide).subscribe(ride => this.myRide = ride);
    });

  }

}
