import { IMoveSnake } from "../interfaces/move-snake.interface";

export class MoveLeftSnake implements IMoveSnake {
    returnVelocidadeX(): number {
        return -10;
    }
    returnVelocidadeY(): number {
        return 0;
    }
    returnDirectionValidation(): string {
        return 'ArrowRight';
    }

}

export class MoveUpSnake implements IMoveSnake {
    returnVelocidadeX(): number {
        return 0;
    }
    returnVelocidadeY(): number {
        return -10;
    }
    returnDirectionValidation(): string {
        return 'ArrowDown';
    }

}

export class MoveRightSnake implements IMoveSnake {
    returnVelocidadeX(): number {
        return 10;
    }
    returnVelocidadeY(): number {
        return 0;
    }
    returnDirectionValidation(): string {
        return 'ArrowLeft';
    }

}

export class MoveDownSnake implements IMoveSnake {
    returnVelocidadeX(): number {
        return 0;
    }
    returnVelocidadeY(): number {
        return 10;
    }
    returnDirectionValidation(): string {
        return 'ArrowUp';
    }

}