import { Component, HostListener, OnInit } from '@angular/core';
import { Fruta } from './models/fruta.model';
import { Game } from './models/game.model';
import { Snake } from './models/snake.model';
import { Velocidade } from './models/velocidade.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event) {
    this.moverSnack(event);
  }

  canvas;
  ctx;
  lastDirection = 'ArrowRight';

  oFruta: Fruta = new Fruta();
  oSnake: Snake = new Snake();
  oGame: Game = new Game();

  lsListaVelocidades: Velocidade[] = [];

  ngOnInit() { }

  ngAfterViewInit() {

    this.canvas = document.getElementById('canvas');

    this.oGame.setWidth(this.canvas.width);
    this.oGame.setHeight(this.canvas.height);

    this.ctx = this.canvas.getContext("2d");

    this.resetarJogo(this.canvas);
    this.ctx.fillStyle = 'green';

    window.setInterval(() => {

      if (!this.oSnake.getComeu() && this.lsListaVelocidades.length !== 0) {
        var tail = this.lsListaVelocidades.shift();
        this.ctx.clearRect(tail.positionX, tail.positionY, 10, 10);
      } else {
        this.oSnake.setComeu(false);
      }

      var positionX = this.oSnake.getPositionX();
      positionX += this.oSnake.getVelocidadeX();
      this.oSnake.setPositionX(positionX);

      var positionY = this.oSnake.getPositionY();
      positionY += this.oSnake.getVelocidadeY();
      this.oSnake.setPositionY(positionY);

      this.ctx.fillRect(this.oSnake.getPositionX(), this.oSnake.getPositionY(), 10, 10);

      this.lsListaVelocidades.push({
        positionX: this.oSnake.getPositionX(),
        positionY: this.oSnake.getPositionY()
      });

      this.oGame.setPontos(this.lsListaVelocidades.length - 1);
      this.oGame.setPontos(this.oGame.getPontos() * 100);

      document.getElementById('contador').innerHTML = `Pontos ${this.oGame.getPontos()}`;

      if (this.oGame.calculateNextLevel()) {
        var nivel = this.oGame.getNivel();
        this.oGame.setNivel(nivel += 1);

        this.oGame.setPontosSalvos(this.oGame.getPontos());

        var frameRate = this.oGame.getFrameRate();
        this.oGame.setFrameRate(frameRate -= 10);
        this.ctx.fillStyle = this.retornaCorRandom();
        document.getElementById('nivel').innerHTML = `Nível ${this.oGame.getNivel()}`;

      } else {
        document.getElementById('nivel').innerHTML = `Nível ${this.oGame.getNivel()}`;
      }

      this.validarColisao();

    }, this.oGame.getFrameRate());

  }

  moverSnack = (evento) => {

    switch (evento['code']) {
      case 'ArrowLeft':
        if (this.lastDirection != 'ArrowRight') {
          this.oSnake.setVelocidadeX(-10);
          this.oSnake.setVelocidadeY(0);
          this.lastDirection = evento['code'];
        }
        break;
      case 'ArrowUp':
        if (this.lastDirection != 'ArrowDown') {
          this.oSnake.setVelocidadeX(0);
          this.oSnake.setVelocidadeY(-10);
          this.lastDirection = evento['code'];
        }
        break;
      case 'ArrowRight':
        if (this.lastDirection != 'ArrowLeft') {
          this.oSnake.setVelocidadeX(10);
          this.oSnake.setVelocidadeY(0);
          this.lastDirection = evento['code'];
        }
        break;
      case 'ArrowDown':
        if (this.lastDirection != 'ArrowUp') {
          this.oSnake.setVelocidadeX(0);
          this.oSnake.setVelocidadeY(10);
          this.lastDirection = evento['code'];
        }
        break;
      default:
        break;
    };
  }

  validarColisao = () => {

    this.canvas = document.getElementById('canvas');

    this.oGame.setWidth(this.canvas.width);
    this.oGame.setHeight(this.canvas.height);

    if (this.oGame.getWidth() - 10 < this.oSnake.getPositionX() || this.oSnake.getPositionY() < 0 || this.oGame.getHeight() - 10 < this.oSnake.getPositionY() || this.oSnake.getPositionX() < 0) {
      this.resetarJogo(this.canvas);
    }

    if (this.oSnake.getPositionX() === this.oFruta.getPositionX() && this.oSnake.getPositionY() === this.oFruta.getPositionY()) {
      this.oSnake.setComeu(true);
      this.regenerarFruta(this.canvas);
    }

    for (let i = 0; i < this.lsListaVelocidades.length - 1; i++) {
      if (this.lsListaVelocidades[i].positionX == this.oSnake.getPositionX() && this.lsListaVelocidades[i].positionY == this.oSnake.getPositionY()) {
        this.resetarJogo(this.canvas);
      }
    }
  }

  resetarJogo = (canvas) => {
    this.ctx = canvas.getContext("2d");

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.lsListaVelocidades = [];

    this.oGame.setPontos(0);
    this.oGame.setNivel(1);
    this.oGame.setFrameRate(100);

    this.oSnake.setComeu(false);
    this.oSnake.setPositionX(0);
    this.oSnake.setPositionY(0);
    this.oSnake.setVelocidadeX(10);
    this.oSnake.setVelocidadeY(0);

    this.regenerarFruta(canvas);
  }

  regenerarFruta = (canvas) => {
    this.ctx = canvas.getContext("2d");

    var frutaX = this.retornaNumeroRandom(0, canvas.width);
    var frutaY = this.retornaNumeroRandom(0, canvas.height);
    var normalizedFrutaX = frutaX - (frutaX % 10);
    var normalizedFrutaY = frutaY - (frutaY % 10);

    var verificaNovaFrutaAuxiliar = [];

    do {
      frutaX = this.retornaNumeroRandom(0, canvas.width);
      frutaY = this.retornaNumeroRandom(0, canvas.height);
      normalizedFrutaX = frutaX - (frutaX % 10);
      normalizedFrutaY = frutaY - (frutaY % 10);

      verificaNovaFrutaAuxiliar = this.lsListaVelocidades.filter(item => item.positionX === normalizedFrutaX && item.positionY === normalizedFrutaY);

    } while (verificaNovaFrutaAuxiliar.length !== 0);

    this.oFruta.setPositionX(normalizedFrutaX);
    this.oFruta.setPositionY(normalizedFrutaY);

    this.ctx.fillRect(this.oFruta.getPositionX(), this.oFruta.getPositionY(), 10, 10);
  }

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
