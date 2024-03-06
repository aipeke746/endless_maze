/**
 * セル（迷路のマス）の種類
 */
export const Cell = {
    /**
     * 壁
     */
    Wall: 0,
    /**
     * 通路
     */
    Floor: 1,
};

export type Cell = (typeof Cell)[keyof typeof Cell]; // eslint-disable-line

/**
 * セルの種類を反転するマップ
 */
const OPPSITE_MAP: Map<Cell, Cell> = new Map<Cell, Cell>([
    [Cell.Wall, Cell.Floor],
    [Cell.Floor, Cell.Wall],
]);

/**
 * 指定したセルの種類の反対を返す
 * 床を指定した場合は壁を、壁を指定した場合は床を返す
 * @param cell セルの種類
 * @returns 対のセルの種類
 */
export function getOpposite(cell: Cell): Cell {
    return OPPSITE_MAP.get(cell);
}
