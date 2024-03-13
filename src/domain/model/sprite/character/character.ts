import { Animation } from '../../animation/animation';
import { CharacterAnimation } from '../../animation/sprite/characterAnimation';
import { MoveDirection } from '../../direction/moveDirection';
import { Coord } from '../../coord/coord';
import { Sprite } from '../sprite';
import { Tilemap } from '../../map/tilemap';
import { GridMove } from '../../tween/gridMove';
import { MoveService } from '../../../service/moveService';

/**
 * キャラクターを管理するクラス
 */
export class Character {
    /**
     * キャラクターのスプライト
     */
    private readonly _sprite: Sprite;
    /**
     * キャラクターのアニメーション
     */
    private readonly animation: Animation;
    /**
     * キャラクターの移動
     */
    private readonly move: GridMove;
    /**
     * キャラクターの移動に関するサービス
     */
    private readonly moveService: MoveService = new MoveService();
    /**
     * キャラクターが歩いているかどうか
     * グリッド移動をするため、歩いている間は他の移動を受け付けない
     */
    private isWalking: boolean = false;
    /**
     * キャラクターの移動にかかる時間: 速い
     */
    private readonly QUIQ_MOVE_DURATION: number = 130;
    /**
     * キャラクターの移動にかかる時間: 普通
     */
    private readonly NORMAL_MOVE_DURATION: number = 200;

    /**
     * キャラクターを生成する
     * @param scene シーン
     * @param tilemap タイルマップ
     * @param spriteName スプライト名
     * @param coord 座標（指定しなければ、通路のランダムな座標に生成される）
     */
    private constructor(scene: Phaser.Scene, _sprite: Sprite, spriteName: string) {
        this._sprite = _sprite;
        this.move = new GridMove(this._sprite, this.QUIQ_MOVE_DURATION);
        this.animation = new CharacterAnimation(scene, this._sprite, spriteName);
    }

    public static createByRandomPos(scene: Phaser.Scene, tilemap: Tilemap, spriteName: string): Character {
        const sprite: Sprite = Sprite.createByRandomPos(scene, tilemap, spriteName);
        return new Character(scene, sprite, spriteName);
    }

    public static createByCoord(scene: Phaser.Scene, tilemap: Tilemap, spriteName: string, coord: Coord): Character {
        const sprite: Sprite = Sprite.createByCoord(scene, tilemap, spriteName, coord);
        return new Character(scene, sprite, spriteName);
    }

    /**
     * キャラクターを移動させる
     * @param tilemap タイルマップ
     * @param direction 移動方向
     */
    public walk(tilemap: Tilemap, direction: MoveDirection): void {
        if (this.isWalking || direction === MoveDirection.Idle) return;

        const nextCoord: Coord = this.moveService.getMoveToCoord(this._sprite, tilemap, direction);
        this.startWalk(direction);
        this.move.run(tilemap, nextCoord, () => {
            this.stopWalk();
        });
    }

    /**
     * キャラクターの移動にかかる時間を設定する
     * @param duration 移動にかかる時間
     */
    public setSlowMoveDuration(): void {
        this.move.setDuration(this.NORMAL_MOVE_DURATION);
    }

    /**
     * キャラクターを移動状態にする
     * @param nextCoord 移動先の座標
     * @param direction 移動方向
     */
    private startWalk(direction: MoveDirection): void {
        this.isWalking = true;
        this.animation.play(direction);
    }

    /**
     * キャラクターが移動していない状態にする
     */
    private stopWalk(): void {
        this.isWalking = false;
        this.animation.stop();
    }

    public get sprite(): Sprite {
        return this._sprite;
    }
}
