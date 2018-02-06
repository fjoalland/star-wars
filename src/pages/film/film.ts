import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {FilmDetailPage} from "./detail/detail";

@Component({
  selector: 'page-film',
  templateUrl: 'film.html'
})
export class FilmPage {
  results: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {

    this.http.get('https://swapi.co/api/films/').subscribe((data) => {
      this.results = data['results'];

      console.log(this.results);
    });
  }

  test(onefilm) {
    console.log('test');
    this.navParams.data.film = onefilm;
    this.navCtrl.push(FilmDetailPage, this.navParams);
  }
}
