import { MoveDirection } from '../../../model/direction/MoveDirection';
import { AnimationService } from '../animationService';

/**
 * キャラクターのアニメーション
 */
export class CharacterAnimation extends AnimationService {
    /**
     * アニメーションの設定
     */
    protected readonly ANIMATION: Array<{
        key: MoveDirection;
        frameStart: number;
        frameEnd: number;
    }> = [
        { key: MoveDirection.DOWN, frameStart: 0, frameEnd: 2 },
        { key: MoveDirection.LEFT, frameStart: 3, frameEnd: 5 },
        { key: MoveDirection.RIGHT, frameStart: 6, frameEnd: 8 },
        { key: MoveDirection.UP, frameStart: 9, frameEnd: 11 },
    ];
}
