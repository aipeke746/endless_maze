/**
 * キャラルターの歩行タイプ（移動方向の種類）
 */
export const MoveDirection = {
    /**
     * 下移動
     */
    Down: 'move_down',
    /**
     * 上移動
     */
    Up: 'move_up',
    /**
     * 左移動
     */
    Left: 'move_left',
    /**
     * 右移動
     */
    Right: 'move_right',
    /**
     * 停止
     */
    Idle: 'idle',
};

export type MoveDirection = (typeof MoveDirection)[keyof typeof MoveDirection]; // eslint-disable-line
