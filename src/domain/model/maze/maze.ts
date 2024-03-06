import { Cell } from '../cell/cell';
import { Coord } from '../coord/coord';
import { MazeFactory } from './generate/mazeFactory';
import { MazeType } from './generate/mazeType';

/**
 * 迷路
 */
export class Maze {
    /**
     * 迷路のサイズ
     * コンストラクタでのみ設定する
     */
    public static SIZE: number;
    /**
     * 迷路全体の状態を表す2次元配列
     */
    private readonly _field: Cell[][];

    /**
     * 迷路を生成する
     * @param mazeType 迷路の種類
     */
    constructor(mazeType: MazeType, size: number) {
        Maze.SIZE = size;
        this._field = new MazeFactory().create(mazeType);
    }

    /**
     * 指定した座標のセルが通路かどうかを返す
     * @param coord 座標
     * @returns 通路の場合はtrue
     */
    public isFloor(coord: Coord): boolean {
        return this._field[coord.y][coord.x] === Cell.Floor;
    }

    /**
     * 床の座標をランダムに取得する
     * @param coord 座標
     */
    public getRandomFloorCoord(): Coord {
        const floorCoords: Coord[] = [];
        this._field.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === Cell.Floor) {
                    floorCoords.push(new Coord(x, y));
                }
            });
        });
        return floorCoords[Math.floor(Math.random() * floorCoords.length)];
    }

    public get field(): Cell[][] {
        return JSON.parse(JSON.stringify(this._field));
    }
}
