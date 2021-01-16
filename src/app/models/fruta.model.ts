export class Fruta {

    private positionX: number;
    private positionY: number;

    constructor() { }

    getPositionX(): number {
        return this.positionX;
    }

    getPositionY(): number {
        return this.positionY;
    }

    setPositionX(positionX): void {
        this.positionX = positionX;
    }

    setPositionY(positionY): void {
        this.positionY = positionY;
    }

}