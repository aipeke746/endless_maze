import { DiggingOut } from '../../service/maze/impl/diggingOut';
import { StickKnockDown } from '../../service/maze/impl/stickKnockDown';
import { MazeType } from '../maze/mazeType';
import { MazeService } from '../../service/maze/mazeService';

/**
 * 迷路生成方法の種類から迷路生成を行うクラスを取得するファクトリクラス
 */
export class MazeFactory {
    /**
     * 迷路生成方法の種類と迷路生成を行うクラスのマップ
     */
    private readonly MAP = new Map<MazeType, MazeService>();

    /**
     * 迷路生成方法の種類と迷路生成を行うクラスのマップを設定する
     */
    constructor() {
        this.MAP.set(MazeType.StickKnockDown, new StickKnockDown());
        this.MAP.set(MazeType.DiggingOut, new DiggingOut());
        this.MAP.set(MazeType.WallStretching, new StickKnockDown());
    }

    /**
     * 迷路生成を行うクラスを作成する
     * @param type 迷路生成方法の種類
     * @returns 迷路生成を行うクラス
     */
    public create(type: MazeType): MazeService {
        return this.MAP.get(type);
    }
}
