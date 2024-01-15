import { MazeFactory } from '../factory/mazeFactory';
import { MazeService } from '../service/mazeService';
import { CellType } from '../type/cellType';
import { MazeType } from '../type/mazeType';

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
}
