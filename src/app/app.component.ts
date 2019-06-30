import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myControl = new FormControl();
  title = 'intranetAngular';
  isTab1Active = true;
  pages: any[] = [];
  internal: any[] = [];
  external: any[] = [];


  constructor(private http: HttpClient){

  }

  openLink(link){
    window.open(link, "_blank");
  }

  toggleTab(){
    this.isTab1Active = !this.isTab1Active;
  }

  ngOnInit() {
    let pages$ = this.http.get('../assets/json/allpages.json');
    pages$.subscribe(
                response => {

                        this.pages = response as [];
                        this.internal = this.pages.filter(x => x.isinternal === true);
                        this.external = this.pages.filter(x => !x.isinternal === true);
                      });

  }

}
