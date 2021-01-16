export class Snake {

    private positionX: number;
    private positionY: number;
    private velocidadeX: number = 10;
    private velocidadeY: number = 0;
    private comeu: boolean = false;

    constructor() { }

    getPositionX(): number {
        return this.positionX;
    }

    setPositionX(positionX): void {
        this.positionX = positionX;
    }


    getPositionY(): number {
        return this.positionY;
    }

    setPositionY(positionY): void {
        this.positionY = positionY;
    }


    getVelocidadeX(): number {
        return this.velocidadeX;
    }

    setVelocidadeX(velocidadeX): void {
        this.velocidadeX = velocidadeX;
    }


    getVelocidadeY(): number {
        return this.velocidadeY;
    }

    setVelocidadeY(velocidadeY): void {
        this.velocidadeY = velocidadeY;
    }


    getComeu(): boolean {
        return this.comeu;
    }

    setComeu(comeu): void {
        this.comeu = comeu;
    }

}