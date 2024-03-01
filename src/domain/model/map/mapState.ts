import { MazeFactory } from './mazeFactory';
import { MazeService } from '../../service/maze/mazeService';
import { CELL, Cell } from '../cell/cell';
import { MazeType } from '../maze/mazeType';
import { Coord } from '../coord/coord';

/**
 * マップ（迷路）の状態を管理するクラス
 */
export class MapState {
    /**
     * 迷路の状態を表す2次元配列
     */
    private readonly field: Cell[][] = [];

    /**
     * マップ（迷路）の状態を生成する
     */
    constructor() {
        const mazeService: MazeService = new MazeFactory().create(MazeType.DiggingOut);
        this.field = mazeService.create();
    }

    /**
     * 迷路の状態を取得する
     * @returns 迷路の状態
     */
    public getField(): Cell[][] {
        return JSON.parse(JSON.stringify(this.field));
    }

    /**
     * 床の座標をランダムに取得する
     * @param coord 座標
     */
    public getRandomFloorCoord(): Coord {
        const floorCoords: Coord[] = [];
        this.field.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === CELL.Floor) {
                    floorCoords.push(new Coord(x, y));
                }
            });
        });
        return floorCoords[Math.floor(Math.random() * floorCoords.length)];
    }

    /**
     * 指定した座標のセルが通路かどうかを返す
     * @param coord 座標
     * @returns 通路の場合はtrue
     */
    public isFloor(coord: Coord): boolean {
        return this.field[coord.y][coord.x] === CELL.Floor;
    }
}
