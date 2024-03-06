import { Sprite } from '../../sprite/sprite';
import { Animation } from '../animation';

/**
 * ゴールのアニメーション
 */
export class GoalAnimation extends Animation {
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

    constructor(scene: Phaser.Scene, sprite: Sprite, spriteName: string) {
        super(scene, sprite, spriteName);
        this.create();
    }
}
