import { MoveDirectionType } from '../../../model/direction/MoveDirectionType';
import { AnimationService } from '../animationService';

/**
 * キャラクターのアニメーション
 */
export class CharacterAnimation extends AnimationService {
    /**
     * アニメーションの設定
     */
    protected readonly ANIMATION: Array<{
        key: MoveDirectionType;
        frameStart: number;
        frameEnd: number;
    }> = [
        { key: MoveDirectionType.DOWN, frameStart: 0, frameEnd: 2 },
        { key: MoveDirectionType.LEFT, frameStart: 3, frameEnd: 5 },
        { key: MoveDirectionType.RIGHT, frameStart: 6, frameEnd: 8 },
        { key: MoveDirectionType.UP, frameStart: 9, frameEnd: 11 },
    ];
}
