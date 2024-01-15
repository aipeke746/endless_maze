import { Param } from '../param';

export class Coord {
    /**
     * 迷路上のx座標
     */
    public readonly x: number;
    /**
     * 迷路上のy座標
     */
    public readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;

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
        return this.x === coord.x && this.y === coord.y;
    }

    /**
     * 指定した座標が無効の座標かどうかを返す
     * 座標がマップ（迷路）外の場合は無効（true）
     * @returns 無効な座標の場合はtrue
     */
    private inValid(): boolean {
        return (
            this.x < 0 ||
            Param.MAZE_SIZE <= this.x ||
            this.y < 0 ||
            Param.MAZE_SIZE <= this.y
        );
    }
}
