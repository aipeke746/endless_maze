import { Tilemap } from '../entity/tilemap';
import { Coord } from './coord';

export class Sprite {
    /**
     * スプライトのサイズ
     */
    private readonly SIZE: number = Tilemap.SIZE;
    /**
     * スプライト
     */
    private readonly sprite: Phaser.GameObjects.Sprite;

    constructor(scene: Phaser.Scene, tilemap: Tilemap, spriteName: string) {
        this.sprite = this.createSpriteByRandomPos(scene, tilemap, spriteName);
    }

    /**
     * スプライトを取得する
     * @returns スプライト
     */
    public getSprite(): Phaser.GameObjects.Sprite {
        return this.sprite;
    }

    /**
     * スプライトのワールド（画面）の座標を取得する
     * @returns スプライトのワールド（画面）の座標
     */
    public getPos(): Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(this.sprite.x, this.sprite.y);
    }

    /**
     * スプライトのマップ（迷路）上の座標を取得する
     * @param tilemap タイルマップ
     * @returns スプライトのマップ（迷路）上の座標
     */
    public getCoord(tilemap: Tilemap): Coord {
        try {
            return tilemap.getTilePos(this.getPos());
        } catch {
            throw new Error('invalid coord by character.ts: getCoord()');
        }
    }

    /**
     * スプライトをランダムな位置に生成する
     * @param scene シーン
     * @param tilemap タイルマップ
     * @param spriteName スプライト名
     * @returns スプライト
     */
    private createSpriteByRandomPos(
        scene: Phaser.Scene,
        tilemap: Tilemap,
        spriteName: string
    ): Phaser.GameObjects.Sprite {
        const coord: Coord = tilemap.mapState.getRandomFloorCoord();
        const pos: Phaser.Math.Vector2 = tilemap.getWorldPos(coord);
        return this.createSprite(scene, pos, spriteName);
    }

    /**
     * スプライトを生成する
     * @param scene シーン
     * @param pos ワールドの座標
     * @param spriteName スプライト名
     * @returns スプライト
     */
    private createSprite(scene: Phaser.Scene, pos: Phaser.Math.Vector2, spriteName: string): Phaser.GameObjects.Sprite {
        return scene.physics.add.sprite(pos.x, pos.y, spriteName).setOrigin(0, 0).setDisplaySize(this.SIZE, this.SIZE);
    }
}
