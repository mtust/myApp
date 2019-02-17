import {Component, NgModule} from "@angular/core";
import { RouterModule, Routes } from '@angular/router'

@Component({
  templateUrl: 'login.html'
})

const routes: Routes = [
  {
    path: '',
    loadChildren: './login/login.html'
  },
  {
    path: 'app',
    loadChildren: './tabs/tabs.html'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class LoginPage {

  constructor() {

  }
}
