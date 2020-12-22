import { Component, HostListener, OnInit } from '@angular/core';

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
  w;
  h;
  velocidadeX = 10;
  velocidadeY = 0;
  positionX = 0;
  positionY = 0;
  comeu = false;
  nivel = 1;
  pontos = 0;
  pontosSalvos = 0;
  frameRate = 50;
  lastDirection = 'ArrowRight';

  lsListaVelocidades = [];
  oFruta = {};

  ngOnInit() { }

  ngAfterViewInit() {

    this.canvas = document.getElementById('canvas');
    this.w = this.canvas.width;
    this.h = this.canvas.height;
    this.ctx = this.canvas.getContext("2d");

    this.resetarJogo(this.canvas);
    this.ctx.fillStyle = 'green';

    window.setInterval(() => {

      if (!this.comeu && this.lsListaVelocidades.length !== 0) {
        var tail = this.lsListaVelocidades.shift();
        this.ctx.clearRect(tail.positionX, tail.positionY, 10, 10);
      } else {
        this.comeu = false;
      }

      this.positionX += this.velocidadeX;
      this.positionY += this.velocidadeY;

      this.ctx.fillRect(this.positionX, this.positionY, 10, 10);

      this.lsListaVelocidades.push({
        positionX: this.positionX,
        positionY: this.positionY
      });

      this.pontos = this.lsListaVelocidades.length - 1;
      document.getElementById('contador').innerHTML = `Pontos ${this.pontos}`;

      if ((this.pontos % 10) === 0 && this.pontosSalvos !== this.pontos) {
        this.nivel += 1;
        this.pontosSalvos = this.pontos;
        this.frameRate -= 10;
        this.ctx.fillStyle = this.retornaCorRandom();
        document.getElementById('nivel').innerHTML = `Nível ${this.nivel}`;
      } else {
        document.getElementById('nivel').innerHTML = `Nível ${this.nivel}`;
      }

      this.validarColisao();

    }, this.frameRate);

  }

  moverSnack = (evento) => {

    switch (evento['code']) {
      case 'ArrowLeft':
        if (this.lastDirection != 'ArrowRight') {
          this.velocidadeX = -10;
          this.velocidadeY = 0;
          this.lastDirection = evento['code'];
        }
        break;
      case 'ArrowUp':
        if (this.lastDirection != 'ArrowDown') {
          this.velocidadeX = 0;
          this.velocidadeY = -10;
          this.lastDirection = evento['code'];
        }
        break;
      case 'ArrowRight':
        if (this.lastDirection != 'ArrowLeft') {
          this.velocidadeX = 10;
          this.velocidadeY = 0;
          this.lastDirection = evento['code'];
        }
        break;
      case 'ArrowDown':
        if (this.lastDirection != 'ArrowUp') {
          this.velocidadeX = 0;
          this.velocidadeY = 10;
          this.lastDirection = evento['code'];
        }
        break;
      default:
        break;
    };
  }

  validarColisao = () => {

    this.canvas = document.getElementById('canvas');
    this.w = this.canvas.width;
    this.h = this.canvas.height;

    if (this.w - 10 < this.positionX || this.positionX < 0 || this.h - 10 < this.positionY || this.positionY < 0) {
      this.resetarJogo(this.canvas);
    }

    if (this.positionX === this.oFruta['positionX'] && this.positionY === this.oFruta['positionY']) {
      this.comeu = true;
      this.regenerarFruta(this.canvas);
    }

    for (let i = 0; i < this.lsListaVelocidades.length - 1; i++) {
      if (this.lsListaVelocidades[i].positionX == this.positionX && this.lsListaVelocidades[i].positionY == this.positionY) {
        this.resetarJogo(this.canvas);
      }
    }
  }

  resetarJogo = (canvas) => {
    this.ctx = canvas.getContext("2d");

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.lsListaVelocidades = [];
    this.comeu = false;

    this.pontos = 0;
    this.nivel = 0;
    this.frameRate = 100;
    this.positionX = 0;
    this.positionY = 0;
    this.velocidadeX = 10;
    this.velocidadeY = 0;

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

    this.oFruta = {
      positionX: normalizedFrutaX,
      positionY: normalizedFrutaY
    };

    this.ctx.fillRect(this.oFruta['positionX'], this.oFruta['positionY'], 10, 10);
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
