import { Animation } from '../../animation/animation';
import { GoalAnimation } from '../../animation/sprite/goalAnimation';
import { Sprite } from '../sprite';
import { Tilemap } from '../../map/tilemap';

/**
 * 迷路のゴールを管理するクラス
 */
export class Goal {
    /**
     * ゴールのスプライト
     */
    private readonly main: Sprite;
    /**
     * ゴールのアニメーション
     */
    private readonly animation: Animation;

    /**
     * ゴールを生成する
     * @param scene シーン
     * @param tilemap タイルマップ
     * @param spriteName スプライト名
     */
    constructor(scene: Phaser.Scene, tilemap: Tilemap, spriteName: string) {
        this.main = new Sprite(scene, tilemap, spriteName);
        this.animation = new GoalAnimation();
        this.animation.create(scene, spriteName);
        this.animation.play(this.main.getSprite(), GoalAnimation.KEY);
    }

    /**
     * ゴールのスプライトを取得する
     * @returns ゴールのスプライト
     */
    public getMain(): Sprite {
        return this.main;
    }
}
