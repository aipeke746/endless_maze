import { Param } from '../../../param';
import { Cell } from '../cell/cell';
import { Coord } from '../coord/coord';
import { CellUtil } from '../cell/cellUtil';

/**
 * フィールド（迷路）に関するユーティリティクラス
 */
export class FieldUtil {
    /**
     * フィールドを指定したセルタイプで埋める
     * @param type セルタイプ
     * @returns 指定したセルタイプで埋めたフィールド
     */
    public static fill(type: Cell): Cell[][] {
        const field: Cell[][] = [];
        for (let y = 0; y < Param.MAZE_SIZE; y++) {
            field[y] = [];
            for (let x = 0; x < Param.MAZE_SIZE; x++) {
                field[y][x] = type;
            }
        }
        return field;
    }

    /**
     * フィールドの外周を指定したセルタイプで埋める（うちは反対のセルタイプで埋める）
     *   例）床を指定した場合は壁で埋める
     * @param type セルタイプ
     * @returns 指定したセルタイプで埋めたフィールド
     */
    public static circumference(type: Cell): Cell[][] {
        const field: Cell[][] = FieldUtil.fill(CellUtil.getOpposite(type));

        for (let y = 0; y < Param.MAZE_SIZE; y++) {
            for (let x = 0; x < Param.MAZE_SIZE; x++) {
                if (this.isCircumference(new Coord(x, y))) {
                    field[y][x] = type;
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
        return coord.x === 0 || coord.x === Param.MAZE_SIZE - 1 || coord.y === 0 || coord.y === Param.MAZE_SIZE - 1;
    }
}
