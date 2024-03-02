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
    private readonly _sprite: Sprite;
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
        this._sprite = new Sprite(scene, tilemap, spriteName);
        this.animation = new GoalAnimation();
        this.animation.create(scene, spriteName);
        this.animation.play(this._sprite.sprite, GoalAnimation.KEY);
    }

    public get sprite(): Sprite {
        return this._sprite;
    }
}
