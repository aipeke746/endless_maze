import { AnimationService } from '../../service/animation/animationService';
import { CharacterAnimation } from '../../service/animation/impl/characterAnimation';
import { MoveService } from '../../service/move/moveService';
import { MoveDirectionType } from '../../type/MoveDirectionType';
import { Coord } from '../vo/coord';
import { Sprite } from '../vo/sprite';
import { Tilemap } from './tilemap';

/**
 * キャラクターを管理するクラス
 */
export class Character {
    /**
     * キャラクターのスプライト
     */
    private readonly main: Sprite;
    /**
     * キャラクターのアニメーション
     */
    private readonly animation: AnimationService;
    /**
     * キャラクターの移動
     */
    private readonly moveService: MoveService;
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
        this.main = new Sprite(scene, tilemap, spriteName);
        this.moveService = new MoveService();
        this.animation = new CharacterAnimation();
        this.animation.create(scene, spriteName);
    }

    /**
     * キャラクターのスプライトを取得する
     * @returns キャラクターのスプライト
     */
    public getMain(): Sprite {
        return this.main;
    }

    /**
     * キャラクターを移動させる
     * @param tilemap タイルマップ
     * @param direction 移動方向
     */
    public walk(tilemap: Tilemap, direction: MoveDirectionType): void {
        if (this.isWalking || direction === MoveDirectionType.IDLE) return;

        const nextCoord: Coord = this.moveService.getMoveToCoord(this.main, tilemap, direction);
        this.startWalk(direction);
        this.moveService.gridMoveTween(this.main, tilemap, nextCoord, () => {
            this.stopWalk();
        });
    }

    /**
     * キャラクターを移動状態にする
     * @param nextCoord 移動先の座標
     * @param direction 移動方向
     */
    private startWalk(direction: MoveDirectionType): void {
        this.isWalking = true;
        this.animation.play(this.main.getSprite(), direction);
    }

    /**
     * キャラクターが移動していない状態にする
     */
    private stopWalk(): void {
        this.isWalking = false;
        this.animation.stop(this.main.getSprite());
    }
}
