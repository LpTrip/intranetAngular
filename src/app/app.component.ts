import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'intranetAngular';
  isTab1Active = true;
  pages: any[] = [];
  internal: any[] = [];
  external: any[] = [];
  myControl = new FormControl();
  options: any[];
  filteredOptions: Observable<string[]>;


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
                        this.options = this.pages;
                        this.internal = this.pages.filter(x => x.isinternal === true);
                        this.external = this.pages.filter(x => !x.isinternal === true);
                        this.filteredOptions = this.myControl.valueChanges
                          .pipe(
                            startWith(''),
                            map(value => this._filter(value))
                          );
                      });

  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

}
