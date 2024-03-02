/**
 * キャラルターの歩行タイプ（移動方向の種類）
 */
export const MoveDirection = {
    /**
     * 下移動
     */
    DOWN: 'move_down',
    /**
     * 上移動
     */
    UP: 'move_up',
    /**
     * 左移動
     */
    LEFT: 'move_left',
    /**
     * 右移動
     */
    RIGHT: 'move_right',
    /**
     * 停止
     */
    IDLE: 'idle',
};

export type MoveDirection = (typeof MoveDirection)[keyof typeof MoveDirection]; // eslint-disable-line
