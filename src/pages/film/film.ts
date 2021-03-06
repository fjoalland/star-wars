import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {FilmDetailPage} from "./detail/detail";
import {SwapiProvider} from "../../providers/swapi/swapi";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'page-film',
  templateUrl: 'film.html'
})
export class FilmPage {
  results: string;
  films$: Observable<string>;


  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private swapi: SwapiProvider) {
    swapi.getFilms();
    this.swapi.films.subscribe((data) => {
      console.log(data)
      this.results = data;
    })

    /*this.http.get('https://swapi.co/api/films/').subscribe((data) => {
      this.results = data['results'];

      console.log(this.results);
    });*/
  }

  displaydetail(onefilm) {
    console.log('test');
    this.navParams.data.film = onefilm;
    this.navCtrl.push(FilmDetailPage, this.navParams);
  }
}
