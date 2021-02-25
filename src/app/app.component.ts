import { Component, HostListener, OnInit } from '@angular/core';
import { Canvas } from './models/canvas.class';
import { Fruta } from './models/fruta.class';
import { Game } from './models/game.class';
import { Snake } from './models/snake.class';
import { Velocidade } from './models/velocidade.model';
import { GameUtilsService } from './utils/services/game-utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    this.moverSnack(event);
  }

  lastDirection: string = 'ArrowRight';

  oFruta: Fruta = new Fruta();
  oSnake: Snake = new Snake();
  oGame: Game = new Game();
  oCanvas: Canvas = new Canvas();

  lsListaVelocidades: Velocidade[] = [];

  constructor(
    private gameUtilsService: GameUtilsService
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {

    this.setCanvasHTMLElement();
    this.setCanvasRendering(this.oCanvas);
    this.oCanvas.setFillStyle('green');

    this.oGame.setWidth(this.oCanvas.getCanvas().width);
    this.oGame.setHeight(this.oCanvas.getCanvas().height);

    this.resetarJogo(this.oCanvas);

    window.setInterval(() => {

      if (!this.oSnake.getComeu() && this.lsListaVelocidades.length !== 0) {
        var tail: Velocidade = this.lsListaVelocidades.shift();
        this.setClearRect(tail.positionX, tail.positionY, 10, 10);
      } else {
        this.oSnake.setComeu(false);
      }

      this.setNewSnakePositions();

      this.setFillRect(this.oSnake.getPositionX(), this.oSnake.getPositionY(), 10, 10);

      this.lsListaVelocidades.push({
        positionX: this.oSnake.getPositionX(),
        positionY: this.oSnake.getPositionY()
      });

      this.oGame.setPontos(this.lsListaVelocidades.length - 1);
      this.oGame.setPontos(this.oGame.getPontos() * 100);

      this.exibirPontos();

      if (this.oGame.calculateNextLevel()) {
        var nivel: number = this.oGame.getNivel();
        this.oGame.setNivel(nivel += 1);

        this.oGame.setPontosSalvos(this.oGame.getPontos());

        var frameRate: number = this.oGame.getFrameRate();
        this.oGame.setFrameRate(frameRate -= 10);
        this.oCanvas.setFillStyle(this.gameUtilsService.retornaCorRandom());

        this.exibirNivel();
      } else {
        this.exibirNivel();
      }

      this.validarColisao();

    }, this.oGame.getFrameRate());

  }

  moverSnack = (evento: KeyboardEvent): void => {

    switch (evento.code) {
      case 'ArrowLeft':
        if (this.lastDirection != 'ArrowRight') {
          this.oSnake.setVelocidadeX(-10);
          this.oSnake.setVelocidadeY(0);
          this.lastDirection = evento.code;
        }
        break;
      case 'ArrowUp':
        if (this.lastDirection != 'ArrowDown') {
          this.oSnake.setVelocidadeX(0);
          this.oSnake.setVelocidadeY(-10);
          this.lastDirection = evento.code;
        }
        break;
      case 'ArrowRight':
        if (this.lastDirection != 'ArrowLeft') {
          this.oSnake.setVelocidadeX(10);
          this.oSnake.setVelocidadeY(0);
          this.lastDirection = evento.code;
        }
        break;
      case 'ArrowDown':
        if (this.lastDirection != 'ArrowUp') {
          this.oSnake.setVelocidadeX(0);
          this.oSnake.setVelocidadeY(10);
          this.lastDirection = evento.code;
        }
        break;
      default:
        break;
    };
  }

  validarColisao = (): void => {

    this.setCanvasHTMLElement();

    this.oGame.setWidth(this.oCanvas.getCanvas().width);
    this.oGame.setHeight(this.oCanvas.getCanvas().height);

    if (
      this.oGame.getWidth() - 10 < this.oSnake.getPositionX() ||
      this.oSnake.getPositionY() < 0 ||
      this.oGame.getHeight() - 10 < this.oSnake.getPositionY() ||
      this.oSnake.getPositionX() < 0
    ) {
      this.resetarJogo(this.oCanvas);
    }

    if (
      this.oSnake.getPositionX() === this.oFruta.getPositionX() &&
      this.oSnake.getPositionY() === this.oFruta.getPositionY()
    ) {
      this.oSnake.setComeu(true);
      this.regenerarFruta(this.oCanvas);
    }

    for (let i = 0; i < this.lsListaVelocidades.length - 1; i++) {
      if (
        this.lsListaVelocidades[i].positionX == this.oSnake.getPositionX() &&
        this.lsListaVelocidades[i].positionY == this.oSnake.getPositionY()
      ) {
        this.resetarJogo(this.oCanvas);
      }
    }
  }

  resetarJogo = (canvas: Canvas): void => {
    this.setCanvasRendering(canvas);
    this.setClearRect(0, 0, canvas.getCanvas().width, canvas.getCanvas().height);

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

  regenerarFruta = (canvas: Canvas): void => {
    this.setCanvasRendering(canvas);

    var frutaX: number = this.gameUtilsService.retornaNumeroRandom(0, canvas.getCanvas().width);
    var frutaY: number = this.gameUtilsService.retornaNumeroRandom(0, canvas.getCanvas().height);
    var normalizedFrutaX: number = frutaX - (frutaX % 10);
    var normalizedFrutaY: number = frutaY - (frutaY % 10);

    var verificaNovaFrutaAuxiliar: Velocidade[] = [];

    do {
      frutaX = this.gameUtilsService.retornaNumeroRandom(0, canvas.getCanvas().width);
      frutaY = this.gameUtilsService.retornaNumeroRandom(0, canvas.getCanvas().height);
      normalizedFrutaX = frutaX - (frutaX % 10);
      normalizedFrutaY = frutaY - (frutaY % 10);

      verificaNovaFrutaAuxiliar = this.lsListaVelocidades.filter(item => item.positionX === normalizedFrutaX && item.positionY === normalizedFrutaY);

    } while (verificaNovaFrutaAuxiliar.length !== 0);

    this.oFruta.setPositionX(normalizedFrutaX);
    this.oFruta.setPositionY(normalizedFrutaY);

    this.setFillRect(this.oFruta.getPositionX(), this.oFruta.getPositionY(), 10, 10);
  }

  setNewSnakePositions() {
    var positionX: number = this.oSnake.getPositionX();
    var positionY: number = this.oSnake.getPositionY();

    positionX += this.oSnake.getVelocidadeX();
    this.oSnake.setPositionX(positionX);

    positionY += this.oSnake.getVelocidadeY();
    this.oSnake.setPositionY(positionY);
  }

  setCanvasRendering(canvas: Canvas) {
    this.oCanvas.setCanvasRendering(canvas.getCanvas().getContext("2d"));
  }

  setClearRect(positionX: number, positionY: number, width: number, height: number) {
    this.oCanvas.getCanvasRendering().clearRect(positionX, positionY, width, height);
  }

  setFillRect(positionX: number, positionY: number, width: number, height: number) {
    this.oCanvas.getCanvasRendering().fillRect(positionX, positionY, width, height);
  }

  setCanvasHTMLElement() {
    this.oCanvas.setCanvas(<HTMLCanvasElement>document.getElementById('canvas'));
  }
  
  exibirPontos() {
    document.getElementById('contador').innerHTML = `Pontos ${this.oGame.getPontos()}`;
  }

  exibirNivel() {
    document.getElementById('nivel').innerHTML = `Nível ${this.oGame.getNivel()}`;
  }

}
