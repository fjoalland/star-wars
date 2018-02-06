import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'page-about',
  templateUrl: 'detail.html'
})
export class FilmDetailPage {

  public film;
  public characters;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {

    this.film = this.navParams.get('film');
    this.characters = new Array();

    let urlCharacters = this.film['characters'];
    urlCharacters.forEach((url) => {

      this.http.get(url).subscribe(character => {
        this.characters.push(character);
      });

    });

    console.log(this.characters);
    console.log("FilmDetailPage", this.film);
  }

}
