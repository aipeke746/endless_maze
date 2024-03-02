import { Param } from '../../../param';

export class Coord {
    /**
     * 座標を生成する
     * @param _x マップ（迷路）上のx座標
     * @param _y マップ（迷路）上のy座標
     */
    constructor(
        private readonly _x: number,
        private readonly _y: number
    ) {
        if (this.inValid()) {
            throw new Error('invalid coord');
        }
    }

    /**
     * 対象の座標と等しいかどうかを返す
     * @param coord 対象の座標
     * @returns 対象の座標と等しい場合はtrue
     */
    public equals(coord: Coord): boolean {
        return this._x === coord._x && this._y === coord._y;
    }

    /**
     * 座標を加算する
     * @param coord 加算する座標
     * @returns 加算した座標
     */
    public add(coord: Coord): Coord {
        return new Coord(this._x + coord._x, this._y + coord._y);
    }

    /**
     * 座標を加算する
     * @param pos 加算する座標
     * @returns 加算した座標
     */
    public addPos(pos: Phaser.Math.Vector2): Coord {
        return new Coord(this._x + pos.x, this._y + pos.y);
    }

    /**
     * 指定した座標が無効の座標かどうかを返す
     * 座標がマップ（迷路）外の場合は無効（true）
     * @returns 無効な座標の場合はtrue
     */
    private inValid(): boolean {
        return this._x < 0 || Param.MAZE_SIZE <= this._x || this._y < 0 || Param.MAZE_SIZE <= this._y;
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }
}
