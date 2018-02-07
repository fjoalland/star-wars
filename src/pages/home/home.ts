import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FilmDetailPage} from "../film/detail/detail";
import {TabsPage} from "../tabs/tabs";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  showFilm() {
    this.navCtrl.push(TabsPage);
  }
}
