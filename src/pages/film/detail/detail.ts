import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {SwapiProvider} from "../../../providers/swapi/swapi";

@Component({
  selector: 'page-about',
  templateUrl: 'detail.html'
})
export class FilmDetailPage {

  public film;
  public characters;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, public loadingCtrl: LoadingController, public swapi: SwapiProvider) {

    // On affiche le loader
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    // On recupere les details du film
    this.film = this.navParams.get('film');
    console.log(this.film['title'])
    this.swapi.getCharacters(this.film);
    this.swapi.filmCharacters.subscribe((characters) => {
      this.characters = characters;
      console.log(characters)
      loader.dismiss();
    })


  }

}
