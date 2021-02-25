
import { Injectable } from '@angular/core';
import { MoveDownSnake, MoveLeftSnake, MoveRightSnake, MoveUpSnake } from '../classes/move-snake.class';
import { IMoveSnake } from '../interfaces/move-snake.interface';

@Injectable()
export class MoveSnakeFactory {

    create(direction: string): IMoveSnake {
        switch (direction) {
            case 'ArrowLeft':
                return new MoveLeftSnake();
            case 'ArrowUp':
                return new MoveUpSnake();
            case 'ArrowRight':
                return new MoveRightSnake();
            case 'ArrowDown':
                return new MoveDownSnake();
            default:
                break;
        };
    }
}