import { Position } from '../store/gameStatsSlice';

export interface Level {
    cells: Array<number[]>;
    playerPos: Position;
}

export const level1 = {
    cells: [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 2, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1]
    ],
    playerPos: { x: 2, y: 2 }
};
