export class Game {

    private pontos: number = 0;
    private pontosSalvos: number = 0;
    private nivel: number = 1;
    private frameRate: number = 50;
    private width: number = 400;
    private height: number = 400;

    constructor() { }

    getPontos(): number {
        return this.pontos;
    }

    setPontos(pontos): void {
        this.pontos = pontos;
    }


    getPontosSalvos(): number {
        return this.pontosSalvos;
    }

    setPontosSalvos(pontosSalvos): void {
        this.pontosSalvos = pontosSalvos;
    }


    getNivel(): number {
        return this.nivel;
    }

    setNivel(nivel): void {
        this.nivel = nivel;
    }


    getFrameRate(): number {
        return this.frameRate;
    }

    setFrameRate(frameRate): void {
        this.frameRate = frameRate;
    }


    getWidth(): number {
        return this.width;
    }

    setWidth(width): void {
        this.width = width;
    }


    getHeight(): number {
        return this.height;
    }

    setHeight(height): void {
        this.height = height;
    }

    calculateNextLevel(): boolean {
        if ((this.getPontos() % 1000) === 0 && this.getPontosSalvos() !== this.getPontos()) {
            return true;

        } else {
            return false;

        }
    }


}