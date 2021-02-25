
import { Injectable } from '@angular/core';
import { MoveDownSnake, MoveLeftSnake, MoveRightSnake, MoveUpSnake } from '../classes/move-snake.class';
import { IMoveSnake } from '../interfaces/move-snake.interface';

@Injectable()
export class MoveSnakeFactory {

    create(direction: string): IMoveSnake {
        if (direction === 'ArrowLeft') {
            return new MoveLeftSnake();
        }
        else if (direction === 'ArrowUp') {
            return new MoveUpSnake();
        }
        else if (direction === 'ArrowRight') {
            return new MoveRightSnake();
        }
        else if (direction === 'ArrowDown') {
            return new MoveDownSnake();
        }
        else {
            return new MoveRightSnake();
        }

    }
}