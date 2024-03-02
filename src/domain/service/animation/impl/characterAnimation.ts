import { MOVE_DIRECTION, MoveDirection } from '../../../model/direction/MoveDirection';
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
        { key: MOVE_DIRECTION.DOWN, frameStart: 0, frameEnd: 2 },
        { key: MOVE_DIRECTION.LEFT, frameStart: 3, frameEnd: 5 },
        { key: MOVE_DIRECTION.RIGHT, frameStart: 6, frameEnd: 8 },
        { key: MOVE_DIRECTION.UP, frameStart: 9, frameEnd: 11 },
    ];
}
