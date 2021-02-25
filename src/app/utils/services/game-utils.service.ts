import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameUtilsService {

  constructor() { }

  retornaNumeroRandom = (min, max) => {
    return parseInt(Math.random() * (max - min) + min);
  }

  retornaCorRandom = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
