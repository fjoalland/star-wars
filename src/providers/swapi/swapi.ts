import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

/*
  Generated class for the SwapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SwapiProvider {

  private _films: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello SwapiProvider Provider');
  }



  getFilms() {
    this.storage.get('films').then((fimsLocal) => {
      console.log(fimsLocal)
      if(fimsLocal) {
        this._films.next(fimsLocal)
      } else {
        this.http.get('https://swapi.co/api/films/').subscribe((data) => {
          let films = data['results'];
          this._films.next(films)
          this.storage.set('films', films).then((storageSet) => {
            console.log(storageSet)
          })
        });
      }
    })

  }


  get films(): Observable<string> {
    return this._films;
  }
}
