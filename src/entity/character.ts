import { AnimationService } from '../service/animation/animationService';
import { CharacterAnimation } from '../service/animation/impl/characterAnimation';
import { MoveService } from '../service/move/moveService';
import { MoveDirectionType } from '../type/MoveDirectionType';
import { Coord } from '../vo/coord';
import { Tilemap } from './tilemap';

/**
 * キャラクターを管理するクラス
 */
export class Character {
    /**
     * キャラクターのサイズ
     */
    private readonly SIZE: number = Tilemap.SIZE;
    /**
     * キャラクターのスプライト
     */
    private readonly sprite: Phaser.GameObjects.Sprite;
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
        this.sprite = this.createSpriteByInitPos(scene, tilemap, spriteName);
        this.moveService = new MoveService();
        this.animation = new CharacterAnimation();
        this.animation.create(scene, spriteName);
    }

    /**
     * キャラクターのスプライトを取得する
     * @returns キャラクターのスプライト
     */
    public getSprite(): Phaser.GameObjects.Sprite {
        return this.sprite;
    }

    /**
     * キャラクターのワールド（画面）の座標を取得する
     * @returns キャラクターのワールド（画面）の座標
     */
    public getPos(): Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(this.sprite.x, this.sprite.y);
    }

    /**
     * キャラクターのマップ（迷路）上の座標を取得する
     * @param tilemap タイルマップ
     * @returns キャラクターのマップ（迷路）上の座標
     */
    public getCoord(tilemap: Tilemap): Coord {
        try {
            return tilemap.getTilePos(this.getPos());
        } catch {
            throw new Error('invalid coord by character.ts: getCoord()');
        }
    }

    /**
     * キャラクターを移動させる
     * @param tilemap タイルマップ
     * @param direction 移動方向
     */
    public walk(tilemap: Tilemap, direction: MoveDirectionType): void {
        if (this.isWalking) return;
        if (direction === MoveDirectionType.IDLE) {
            this.stopWalk();
            return;
        }

        const nextCoord: Coord = this.moveService.getMoveToCoord(this, tilemap, direction);
        this.startWalk(direction);
        this.moveService.gridMoveTween(this, tilemap, nextCoord, () => {
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
        this.animation.play(this.sprite, direction);
    }

    /**
     * キャラクターが移動していない状態にする
     */
    private stopWalk(): void {
        this.isWalking = false;
        this.animation.stop(this.sprite);
    }

    /**
     * キャラクターのスプライトを初期位置（左上）に生成する
     * @param scene シーン
     * @param tilemap タイルマップ
     * @param spriteName スプライト名
     * @returns キャラクターのスプライト
     */
    private createSpriteByInitPos(
        scene: Phaser.Scene,
        tilemap: Tilemap,
        spriteName: string
    ): Phaser.GameObjects.Sprite {
        const coord: Coord = new Coord(1, 1);
        const pos: Phaser.Math.Vector2 = tilemap.getWorldPos(coord);
        return this.createSprite(scene, pos, spriteName);
    }

    /**
     * キャラクターのスプライトを生成する
     * @param scene シーン
     * @param pos ワールドの座標
     * @param spriteName スプライト名
     * @returns キャラクターのスプライト
     */
    private createSprite(scene: Phaser.Scene, pos: Phaser.Math.Vector2, spriteName: string): Phaser.GameObjects.Sprite {
        return scene.physics.add.sprite(pos.x, pos.y, spriteName).setOrigin(0, 0).setDisplaySize(this.SIZE, this.SIZE);
    }
}
