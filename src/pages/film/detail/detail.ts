import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'page-about',
  templateUrl: 'detail.html'
})
export class FilmDetailPage {

  public film;
  public characters;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, public loadingCtrl: LoadingController) {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    this.film = this.navParams.get('film');
    this.characters = new Array();

    let urlCharacters = this.film['characters'];
    urlCharacters.forEach((url) => {

      // Permet de recuperer l'ID du dernière URL
      let lastUrl = this.film['characters'][this.film['characters'].length- 1];

      this.http.get(url).subscribe(character => {
        this.characters.push(character);
      });

      // On dissimule de loader
      if(url === lastUrl){
        loader.dismiss();
      }

    });

    console.log(this.characters);
    console.log("FilmDetailPage", this.film);
  }

}
