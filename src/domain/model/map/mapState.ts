import { Maze } from '../maze/maze';
import { MAZE_TYPE } from '../maze/generate/mazeType';

/**
 * マップ（迷路）の状態を管理するクラス
 */
export class MapState {
    /**
     * 迷路の状態を表す2次元配列
     */
    private readonly _maze: Maze;

    /**
     * マップ（迷路）の状態を生成する
     */
    constructor() {
        this._maze = new Maze(MAZE_TYPE.DiggingOut);
    }

    /**
     * 迷路の状態を取得する
     * @returns 迷路の状態
     */
    public get maze(): Maze {
        return this._maze;
    }
}
