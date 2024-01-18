import { DiggingOut } from '../service/maze/impl/diggingOut';
import { StickKnockDown } from '../service/maze/impl/stickKnockDown';
import { MazeType } from '../type/mazeType';
import { MazeService } from '../service/maze/mazeService';

/**
 * 迷路生成方法の種類から迷路生成を行うクラスを取得するファクトリクラス
 */
export class MazeFactory {
    /**
     * 迷路生成方法の種類と迷路生成を行うクラスのマップ
     */
    private static readonly MAP: Map<MazeType, MazeService> = new Map<
        MazeType,
        MazeService
    >([
        [MazeType.StickKnockDown, new StickKnockDown()],
        [MazeType.DiggingOut, new DiggingOut()],
    ]);

    /**
     * 迷路生成を行うクラスを作成する
     * @param type 迷路生成方法の種類
     * @returns 迷路生成を行うクラス
     */
    public static create(type: MazeType): MazeService {
        return this.MAP.get(type);
    }
}
