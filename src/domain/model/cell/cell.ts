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
