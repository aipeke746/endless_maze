import { Cell } from './cell';

/**
 * セル（迷路のマス）の種類に関するユーティリティクラス
 */
export class CellUtil {
    /**
     * セルの種類を反転するマップ
     */
    private static readonly OPPSITE_MAP: Map<Cell, Cell> = new Map<Cell, Cell>([
        [Cell.Wall, Cell.Floor],
        [Cell.Floor, Cell.Wall],
    ]);

    /**
     * 指定したセルの種類の反対を返す
     * 床を指定した場合は壁を、壁を指定した場合は床を返す
     * @param type セルの種類
     * @returns 対のセルの種類
     */
    public static getOpposite(type: Cell): Cell {
        return this.OPPSITE_MAP.get(type);
    }
}
