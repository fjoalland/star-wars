import { Component } from '@angular/core';

import { FilmPage } from '../film/film';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FilmPage;

  constructor() {

  }
}
