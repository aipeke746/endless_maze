import { Param } from '../param';
import { CellType } from '../type/cellType';

/**
 * フィールド（迷路）に関するユーティリティクラス
 */
export class FieldUtil {
    /**
     * フィールドを指定したセルタイプで埋める
     * @param type セルタイプ
     * @returns 指定したセルタイプで埋めたフィールド
     */
    public static fill(type: CellType): CellType[][] {
        const field: CellType[][] = [];
        for (let y = 0; y < Param.MAZE_SIZE; y++) {
            field[y] = [];
            for (let x = 0; x < Param.MAZE_SIZE; x++) {
                field[y][x] = type;
            }
        }
        return field;
    }
}
