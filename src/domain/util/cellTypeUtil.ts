import { CellType } from '../type/cellType';

/**
 * セル（迷路のマス）の種類に関するユーティリティクラス
 */
export class CellTypeUtil {
    /**
     * セルの種類を反転するマップ
     */
    private static readonly OPPSITE_MAP: Map<CellType, CellType> = new Map<CellType, CellType>([
        [CellType.WALL, CellType.FLOOR],
        [CellType.FLOOR, CellType.WALL],
    ]);

    /**
     * 指定したセルの種類の反対を返す
     * 床を指定した場合は壁を、壁を指定した場合は床を返す
     * @param type セルの種類
     * @returns 対のセルの種類
     */
    public static getOpposite(type: CellType): CellType {
        return this.OPPSITE_MAP.get(type);
    }
}
