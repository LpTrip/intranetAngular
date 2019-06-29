import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'intranetAngular';
  isTab1Active = true;

  constructor(){

  }

  toggleTab(){
    this.isTab1Active = !this.isTab1Active;
  }
}
