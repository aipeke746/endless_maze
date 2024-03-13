/**
 * 方向
 */
export const Direction = {
    /**
     * 下方向
     */
    Down: 0,
    /**
     * 上方向
     */
    Up: 1,
    /**
     * 左方向
     */
    Left: 2,
    /**
     * 右方向
     */
    Right: 3,
    /**
     * 中央
     */
    Center: 4,
};

export type Direction = (typeof Direction)[keyof typeof Direction]; // eslint-disable-line
