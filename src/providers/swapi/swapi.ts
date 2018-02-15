import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import { Storage } from '@ionic/storage';

/*
  Generated class for the SwapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SwapiProvider {

  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello SwapiProvider Provider');
  }



  getFilms() {

    if(this.storage.get('films')){
      //return this.storage.get('films');
    }

    this.http.get('https://swapi.co/api/films/').subscribe((data) => {
      console.log('ok : ' + data);
      let films = data['results'];
      this.storage.set('films', films);
      return films;
    });
  }

}
