import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  results: string;
  constructor(public navCtrl: NavController, private http: HttpClient) {

    this.http.get('https://swapi.co/api/films/').subscribe((data) => {
      this.results = data['results'];

      console.log(this.results);
    })

  }

}
