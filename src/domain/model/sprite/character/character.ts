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
     * キャラクターの移動にかかる時間: 通常
     */
    private readonly NORMAL_MOVE_DURATION: number = 130;
    /**
     * キャラクターの移動にかかる時間: ゆっくり
     */
    private readonly SLOW_MOVE_DURATION: number = 200;

    /**
     * キャラクターを生成する
     * @param scene シーン
     * @param tilemap タイルマップ
     * @param spriteName スプライト名
     * @param coord 座標（指定しなければ、通路のランダムな座標に生成される）
     */
    constructor(scene: Phaser.Scene, tilemap: Tilemap, spriteName: string, coord?: Coord) {
        this._sprite = new Sprite(scene, tilemap, spriteName, coord);
        this.move = new GridMove(this._sprite, this.NORMAL_MOVE_DURATION);
        this.animation = new CharacterAnimation(scene, this._sprite, spriteName);
    }

    /**
     * キャラクターを移動させる
     * @param tilemap タイルマップ
     * @param direction 移動方向
     */
    public walk(tilemap: Tilemap, direction: MoveDirection): void {
        if (this.isWalking || direction === MoveDirection.IDLE) return;

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
        this.move.setDuration(this.SLOW_MOVE_DURATION);
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
