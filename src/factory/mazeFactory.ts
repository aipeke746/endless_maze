import { DiggingOut } from '../service/impl/diggingOut';
import { StickKnockDown } from '../service/impl/stickKnockDown';
import { MazeType } from '../type/mazeType';
import { MazeService } from '../service/mazeService';

/**
 * 迷路生成方法の種類から迷路生成を行うクラスを作成するファクトリクラス
 */
export class MazeFactory {
    /**
     * 迷路生成を行うクラスを作成する
     * @param type 迷路生成方法の種類
     * @returns 迷路生成を行うクラス
     */
    public static create(type: MazeType): MazeService {
        switch (type) {
            case MazeType.StickKnockDown:
                return new StickKnockDown();
            case MazeType.DiggingOut:
                return new DiggingOut();
        }
    }
}
