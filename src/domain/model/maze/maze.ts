import { Cell } from '../cell/cell';
import { MazeFactory } from './generate/mazeFactory';
import { MAZE_TYPE } from './generate/mazeType';

/**
 * 迷路
 */
export class Maze {
    /**
     * 迷路全体の状態を表す2次元配列
     */
    private readonly _field: Cell[][];

    constructor() {
        this._field = new MazeFactory().create(MAZE_TYPE.DiggingOut);
    }

    public get field(): Cell[][] {
        return JSON.parse(JSON.stringify(this._field));
    }
}
