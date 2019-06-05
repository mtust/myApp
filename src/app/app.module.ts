import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import {AgmCoreModule} from '@agm/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AgmDirectionModule} from "agm-direction";
import {HttpModule} from "@angular/http";
import {ApiService} from "../services/http/api.service";
import {JwtService} from "../services/http/jwt.service";
import {RideService} from "../services/RideService";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCqDDNHBHNG96GVEIFwgAuIFD9k4O-h96o",
      libraries: ["places"]
    }),
    AgmDirectionModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    ApiService,
    JwtService,
    RideService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
