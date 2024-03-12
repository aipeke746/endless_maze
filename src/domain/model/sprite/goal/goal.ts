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
     */
    private constructor(scene: Phaser.Scene, _sprite: Sprite, spriteName: string) {
        this._sprite = _sprite;
        this.animation = new GoalAnimation(scene, this._sprite, spriteName);
        this.animation.play(GoalAnimation.KEY);
    }

    /**
     * ランダムな位置にゴールを生成
     * @param scene シーン
     * @param tilemap タイルマップ
     * @param spriteName スプライト名
     * @returns ゴール
     */
    public static createByRandomPos(scene: Phaser.Scene, tilemap: Tilemap, spriteName: string): Goal {
        const sprite: Sprite = Sprite.createByRandomPos(scene, tilemap, spriteName);
        return new Goal(scene, sprite, spriteName);
    }

    /**
     * 指定した座標にゴールを生成
     * @param scene シーン
     * @param tilemap タイルマップ
     * @param spriteName スプライト名
     * @param coord 座標
     * @returns ゴール
     */
    public static createByCoord(scene: Phaser.Scene, tilemap: Tilemap, spriteName: string, coord: Coord): Goal {
        const sprite: Sprite = Sprite.createByCoord(scene, tilemap, spriteName, coord);
        return new Goal(scene, sprite, spriteName);
    }

    public get sprite(): Sprite {
        return this._sprite;
    }
}
