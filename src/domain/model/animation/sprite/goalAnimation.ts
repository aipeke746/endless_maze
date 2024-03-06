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

    /**
     * ゴールのアニメーションを生成する
     * @param scene シーン
     * @param spriteName スプライト名
     */
    constructor(scene: Phaser.Scene, spriteName: string) {
        super();
        this.create(scene, spriteName);
    }
}
