import { DiggingOut } from './type/diggingOut';
import { StickKnockDown } from './type/stickKnockDown';
import { MAZE_TYPE, MazeType } from './mazeType';
import { Cell } from '../../cell/cell';

/**
 * 迷路生成方法の種類から迷路生成を行うクラスを取得するファクトリクラス
 */
export class MazeFactory {
    /**
     * 迷路生成方法の種類と迷路生成を行うクラスのマップ
     */
    private readonly MAP = new Map<MazeType, MazeGenerate>();

    /**
     * 迷路生成方法の種類と迷路生成を行うクラスのマップを設定する
     */
    constructor() {
        this.MAP.set(MAZE_TYPE.StickKnockDown, new StickKnockDown());
        this.MAP.set(MAZE_TYPE.DiggingOut, new DiggingOut());
        this.MAP.set(MAZE_TYPE.WallStretching, new StickKnockDown());
    }

    /**
     * 迷路生成を行うクラスを作成する
     * @param mazeType 迷路生成方法の種類
     * @returns 迷路生成を行うクラス
     */
    public create(mazeType: MazeType): Cell[][] {
        const maze: MazeGenerate = this.MAP.get(mazeType);
        return maze.create();
    }
}

export interface MazeGenerate {
    /**
     * 迷路を生成する
     */
    create: () => Cell[][];
}
