import { Cell, getOpposite } from '../cell/cell';
import { Coord } from '../coord/coord';
import { Maze } from './maze';

/**
 * フィールド（迷路）に関するユーティリティクラス
 */
export class FieldUtil {
    /**
     * フィールドを指定したセルタイプで埋める
     * @param cell セルタイプ
     * @returns 指定したセルタイプで埋めたフィールド
     */
    public static fill(cell: Cell): Cell[][] {
        const field: Cell[][] = [];
        for (let y = 0; y < Maze.SIZE; y++) {
            field[y] = [];
            for (let x = 0; x < Maze.SIZE; x++) {
                field[y][x] = cell;
            }
        }
        return field;
    }

    /**
     * フィールドの外周を指定したセルタイプで埋める（うちは反対のセルタイプで埋める）
     *   例）床を指定した場合は壁で埋める
     * @param cell セルタイプ
     * @returns 指定したセルタイプで埋めたフィールド
     */
    public static circumference(cell: Cell): Cell[][] {
        const field: Cell[][] = FieldUtil.fill(getOpposite(cell));

        for (let y = 0; y < Maze.SIZE; y++) {
            for (let x = 0; x < Maze.SIZE; x++) {
                if (this.isCircumference(new Coord(x, y))) {
                    field[y][x] = cell;
                }
            }
        }
        return field;
    }

    /**
     * 指定した座標が外周（迷路の一番外側）かどうかを返す
     * @param coord 座標
     * @returns 外周の場合はtrue
     */
    public static isCircumference(coord: Coord): boolean {
        return coord.x === 0 || coord.x === Maze.SIZE - 1 || coord.y === 0 || coord.y === Maze.SIZE - 1;
    }
}
