import { MoveService } from '../service/move/moveService';
import { CharacterAnimation } from '../static/characterAnimation';
import { MoveDirectionType } from '../type/MoveDirectionType';
import { Coord } from '../vo/coord';
import { Tilemap } from './tilemap';

export class Character {
    /**
     * キャラクターのサイズ
     */
    private static readonly SIZE: number = 60;
    /**
     * キャラクターのスプライト
     */
    private readonly sprite: Phaser.GameObjects.Sprite;
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
        CharacterAnimation.create(scene, spriteName);
        this.sprite = this.createSpriteByRandomPos(scene, tilemap, spriteName);
        this.moveService = new MoveService();
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

        const nextCoord: Coord | undefined = this.moveService.getMoveToCoord(
            this,
            tilemap,
            direction
        );
        if (nextCoord !== undefined) {
            this.startWalk(direction);
            this.moveService.gridMoveTween(this, tilemap, nextCoord, () => {
                this.stopWalk();
            });
        }
    }

    /**
     * キャラクターを移動状態にする
     * @param nextCoord 移動先の座標
     * @param direction 移動方向
     */
    private startWalk(direction: MoveDirectionType): void {
        this.isWalking = true;
        this.playAnimation(direction);
    }

    /**
     * キャラクターが移動していない状態にする
     */
    private stopWalk(): void {
        this.isWalking = false;
        this.sprite.anims.stop();
    }

    /**
     * キャラクターのアニメーションを再生する
     * @param walkType 歩行タイプ
     */
    private playAnimation(walkType: MoveDirectionType): void {
        this.sprite.anims.play(walkType);
    }

    /**
     * キャラクターをランダムな位置に生成する
     * @param scene シーン
     * @param tilemap タイルマップ
     * @param spriteName スプライト名
     * @returns キャラクター
     */
    private createSpriteByRandomPos(
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
    private createSprite(
        scene: Phaser.Scene,
        pos: Phaser.Math.Vector2,
        spriteName: string
    ): Phaser.GameObjects.Sprite {
        return scene.add
            .sprite(pos.x, pos.y, spriteName)
            .setOrigin(0, 0)
            .setDisplaySize(Character.SIZE, Character.SIZE);
    }
}
