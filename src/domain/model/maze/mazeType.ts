/**
 * 迷路の生成方法の種類
 */
export const MAZE_TYPE = {
    /**
     * 棒倒し法
     */
    StickKnockDown: "棒倒し法",
    /**
     * 穴掘り法
     */
    DiggingOut: "穴掘り法",
    /**
     * 壁のばし法
     */
    WallStretching: "壁のばし法",
}

export type MazeType = (typeof MAZE_TYPE)[keyof typeof MAZE_TYPE]
