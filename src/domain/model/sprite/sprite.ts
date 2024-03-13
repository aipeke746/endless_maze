import { Tilemap } from '../map/tilemap';
import { Coord } from '../coord/coord';

export class Sprite {
    /**
     * スプライトのサイズ
     */
    private readonly SIZE: number = Tilemap.SIZE;
    /**
     * スプライト
     */
    private readonly _sprite: Phaser.GameObjects.Sprite;

    /**
     * スプライトを生成する
     * @param scene シーン
     * @param pos ワールドの座標
     * @param spriteName スプライト名
     */
    private constructor(scene: Phaser.Scene, pos: Phaser.Math.Vector2, spriteName: string) {
        this._sprite = scene.physics.add
            .sprite(pos.x, pos.y, spriteName)
            .setOrigin(0, 0)
            .setDisplaySize(this.SIZE, this.SIZE);
    }

    /**
     * 指定した座標にスプライトを生成
     * @param scene シーン
     * @param tilemp タイルマップ
     * @param spriteName スプライト名
     * @param coord 座標
     * @returns スプライト
     */
    public static createByCoord(scene: Phaser.Scene, tilemp: Tilemap, spriteName: string, coord: Coord): Sprite {
        const pos: Phaser.Math.Vector2 = tilemp.getWorldPos(coord);
        return new Sprite(scene, pos, spriteName);
    }

    /**
     * 指定した位置にスプライトを生成
     * @param scene シーン
     * @param spriteName スプライト名
     * @param pos 座標
     * @returns スプライト
     */
    public static createByPos(scene: Phaser.Scene, spriteName: string, pos: Phaser.Math.Vector2): Sprite {
        return new Sprite(scene, pos, spriteName);
    }

    /**
     * ランダムな位置にスプライトを生成
     * @param scene シーン
     * @param tilemap タイルマップ
     * @param spriteName スプライト名
     * @returns
     */
    public static createByRandomPos(scene: Phaser.Scene, tilemap: Tilemap, spriteName: string): Sprite {
        const randomCoord: Coord = tilemap.maze.getRandomFloorCoord();
        const randomPos: Phaser.Math.Vector2 = tilemap.getWorldPos(randomCoord);
        return new Sprite(scene, randomPos, spriteName);
    }

    /**
     * スプライトのワールド（画面）の中央座標を設定する
     * @param pos ワールドの座標
     */
    public setCenterPos(pos: Phaser.Math.Vector2): void {
        this._sprite.setPosition(pos.x, pos.y).setOrigin(0.5, 0.5);
    }

    /**
     * スプライトのワールド（画面）の座標を設定する
     * @param pos ワールドの座標
     */
    public setPos(pos: Phaser.Math.Vector2): void {
        this._sprite.setPosition(pos.x, pos.y);
    }

    /**
     * スプライトのワールド（画面）の座標を取得する
     * @returns スプライトのワールド（画面）の座標
     */
    public getPos(): Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(this._sprite.x, this._sprite.y);
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
     * スプライトのサイズを設定する
     * @param size サイズ
     */
    public setSize(size: number): void {
        this._sprite.setDisplaySize(size, size);
    }

    /**
     * スプライトを表示する
     */
    public visible(): void {
        this._sprite.setAlpha(1);
    }

    /**
     * スプライトを非表示にする
     */
    public invisible(): void {
        this._sprite.setAlpha(0);
    }

    public get sprite(): Phaser.GameObjects.Sprite {
        return this._sprite;
    }
}
