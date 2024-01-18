import { MazeFactory } from '../factory/mazeFactory';
import { MazeService } from '../service/maze/mazeService';
import { CellType } from '../type/cellType';
import { MazeType } from '../type/mazeType';
import { Coord } from '../vo/coord';

/**
 * マップ（迷路）の状態を管理するクラス
 */
export class MapState {
    /**
     * 迷路の状態を表す2次元配列
     */
    private readonly field: CellType[][] = [];

    constructor() {
        const mazeService: MazeService = MazeFactory.create(
            MazeType.DiggingOut
        );
        this.field = mazeService.create();
    }

    /**
     * 迷路の状態を取得する
     * @returns 迷路の状態
     */
    public getField(): CellType[][] {
        return this.field;
    }

    /**
     * 指定した座標のセルが通路かどうかを返す
     * @param coord 座標
     * @returns 通路の場合はtrue
     */
    public isFloor(coord: Coord): boolean {
        return this.field[coord.y][coord.x] === CellType.FLOOR;
    }
}
