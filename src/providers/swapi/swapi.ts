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
  private _filmDetails: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(public http: HttpClient, public storage: Storage) { }

  getFilms() {
    // On verifie si on a deja les films en cache
    this.storage.get('films').then((fimsLocal) => {

      // Si on a les films en cache, on les retournent à travers un observable
      if(fimsLocal) {
        this._films.next(fimsLocal)
      } else {

        // On appele SWAPI et on recupere les fims
        this.http.get('https://swapi.co/api/films/').subscribe((data) => {
          let films = data['results'];
          this._films.next(films)
          this.storage.set('films', films);
        });
      }
    })
  }

  getFilmDetails() {
    
  }


  get films(): BehaviorSubject<string> {
    return this._films;
  }


  get filmDetails(): BehaviorSubject<string> {
    return this._filmDetails;
  }
}
