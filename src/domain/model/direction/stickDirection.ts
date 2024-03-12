/**
 * 操作スティックの方向
 */
export const StickDirection = {
    /**
     * 下移動
     */
    Down: 'stick_down',
    /**
     * 上移動
     */
    Up: 'stick_up',
    /**
     * 左移動
     */
    Left: 'stick_left',
    /**
     * 右移動
     */
    Right: 'stick_right',
    /**
     * 停止
     */
    Idle: 'stick_idle',
};

export type StickDirection = (typeof StickDirection)[keyof typeof StickDirection]; // eslint-disable-line
