/**
 * セル（迷路のマス）の種類
 */
export const CELL = {
    /**
     * 壁
     */
    Wall: 0,
    /**
     * 通路
     */
    Floor: 1,
};

export type Cell = (typeof CELL)[keyof typeof CELL];

export function toCell(value: number): Cell {
    if (!Object.values(CELL).includes(value)) {
        throw new Error('error');
    }
    return value;
}
