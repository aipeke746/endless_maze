import { Animation } from '../../animation/animation';
import { CharacterAnimation } from '../../animation/sprite/characterAnimation';
import { MoveCheck } from '../../move/moveCheck';
import { MoveDirection } from '../../direction/moveDirection';
import { Coord } from '../../coord/coord';
import { Sprite } from '../sprite';
import { Tilemap } from '../../map/tilemap';
import { GridMove } from '../../tween/gridMove';

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
    private readonly moveCheck: MoveCheck = new MoveCheck();
    /**
     * キャラクターが歩いているかどうか
     * グリッド移動をするため、歩いている間は他の移動を受け付けない
     */
    private isWalking: boolean = false;

    /**
     * キャラクターを生成する
     * @param scene シーン
     * @param tilemap タイルマップ
     * @param spriteName スプライト名
     */
    constructor(scene: Phaser.Scene, tilemap: Tilemap, spriteName: string) {
        this._sprite = new Sprite(scene, tilemap, spriteName);
        this.move = new GridMove(this._sprite);
        this.animation = new CharacterAnimation(scene, spriteName);
    }

    /**
     * キャラクターを移動させる
     * @param tilemap タイルマップ
     * @param direction 移動方向
     */
    public walk(tilemap: Tilemap, direction: MoveDirection): void {
        if (this.isWalking || direction === MoveDirection.IDLE) return;

        const nextCoord: Coord = this.moveCheck.getMoveToCoord(this._sprite, tilemap, direction);
        this.startWalk(direction);
        this.move.run(tilemap, nextCoord, () => {
            this.stopWalk();
        });
    }

    /**
     * キャラクターを移動状態にする
     * @param nextCoord 移動先の座標
     * @param direction 移動方向
     */
    private startWalk(direction: MoveDirection): void {
        this.isWalking = true;
        this.animation.play(this._sprite.sprite, direction);
    }

    /**
     * キャラクターが移動していない状態にする
     */
    private stopWalk(): void {
        this.isWalking = false;
        this.animation.stop(this._sprite.sprite);
    }

    public get sprite(): Sprite {
        return this._sprite;
    }
}
