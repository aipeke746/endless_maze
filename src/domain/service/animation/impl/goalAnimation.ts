import { AnimationService } from '../animationService';

/**
 * ゴールのアニメーション
 */
export class GoalAnimation extends AnimationService {
    /**
     * アニメーションのキー
     */
    public static readonly KEY: string = 'goal';

    /**
     * アニメーションの設定
     */
    protected readonly ANIMATION: Array<{
        key: string;
        frameStart: number;
        frameEnd: number;
    }> = [{ key: GoalAnimation.KEY, frameStart: 0, frameEnd: 19 }];
}
