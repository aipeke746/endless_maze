/**
 * キャラルターの歩行タイプ（移動方向の種類）
 */
export enum MoveDirectionType {
    /**
     * 下移動
     */
    DOWN = 'move_front',
    /**
     * 上移動
     */
    UP = 'move_back',
    /**
     * 左移動
     */
    LEFT = 'move_left',
    /**
     * 右移動
     */
    RIGHT = 'move_right',
    /**
     * 停止
     */
    IDLE = 'idle',
}
