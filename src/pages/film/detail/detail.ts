import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'detail.html'
})
export class FilmDetailPage {
  film;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.film = this.navParams.get('film');

    console.log("FilmDetailPage", this.film);
  }

}
