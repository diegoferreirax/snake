import { IMoveSnake } from "../interfaces/move-snake.interface";

export class MoveLeftSnake implements IMoveSnake {
    returnVelocidadeX(): number {
        return -10;
    }
    returnVelocidadeY(): number {
        return 0;
    }

}

export class MoveUpSnake implements IMoveSnake {
    returnVelocidadeX(): number {
        return 0;
    }
    returnVelocidadeY(): number {
        return -10;
    }

}

export class MoveRightSnake implements IMoveSnake {
    returnVelocidadeX(): number {
        return 10;
    }
    returnVelocidadeY(): number {
        return 0;
    }

}

export class MoveDownSnake implements IMoveSnake {
    returnVelocidadeX(): number {
        return 0;
    }
    returnVelocidadeY(): number {
        return 10;
    }

}