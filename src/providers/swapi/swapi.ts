import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

/*
  Generated class for the SwapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SwapiProvider {

  private _films: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _filmCharacters = new BehaviorSubject<any[]>([]);

  constructor(public http: HttpClient, public storage: Storage) { }

  getFilms() {
    // On verifie si on a deja les films en cache
    this.storage.get('films').then((fimsLocal) => {

      // Si on a les films en cache, on les retournent à travers un observable
      if(fimsLocal) {
        console.log(fimsLocal)
        this._films.next(fimsLocal)
      } else {

        // On appele SWAPI et on recupere les fims
        this.http.get('https://swapi.co/api/films/').subscribe((data) => {
          let films = data['results'];
          this._films.next(films)
          this.storage.set('films', films).then();
        });
      }
    })
  }

  getCharacters(film) {
    console.log('getCharacters');
    let characters = new Array();
    let filmName = film.title;
    let urlCharacters = film['characters'];
    // Permet de recuperer l'ID du dernière URL
    let lastUrl = film['characters'][film['characters'].length- 1];
    console.log(lastUrl)
    this.storage.get(filmName).then((filmCharacters) => {
        console.log("count")
        if(filmCharacters) {
          console.log("cache", filmCharacters)
          this.filmCharacters.next(filmCharacters)
        } else {

          urlCharacters.forEach((url) => {
            this.http.get(url).subscribe(character => {
              characters.push(character);
            });

            // On dissimule de loader
            if(url === lastUrl){
              console.log("before to next", characters)
              this.storage.set(filmName, characters).then();
              this.filmCharacters.next(characters)
            }
          })

        }

    })




  }


  get films(): BehaviorSubject<string> {
    return this._films;
  }


  get filmCharacters(): BehaviorSubject<any[]> {
    return this._filmCharacters;
  }
}
