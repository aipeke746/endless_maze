import { Animation } from '../../animation/animation';
import { GoalAnimation } from '../../animation/sprite/goalAnimation';
import { Sprite } from '../sprite';
import { Tilemap } from '../../map/tilemap';
import { Coord } from '../../coord/coord';

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
     * @param coord 座標（指定しなければ、通路のランダムな座標に生成される）
     */
    constructor(scene: Phaser.Scene, tilemap: Tilemap, spriteName: string, coord?: Coord) {
        this._sprite = new Sprite(scene, tilemap, spriteName, coord);
        this.animation = new GoalAnimation(scene, this._sprite, spriteName);
        this.animation.play(GoalAnimation.KEY);
    }

    public get sprite(): Sprite {
        return this._sprite;
    }
}
