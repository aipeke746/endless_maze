import { MazeType } from '../type/mazeType';
import { Coord } from '../vo/coord';
import { MapState } from './mapState';

/**
 * タイルマップを表すクラス
 *
 * MapStateの内容をこのクラスに反映させることで、更新した迷路を描画する
 */
export class Tilemap {
    /**
     * タイルマップの1マスのサイズ
     */
    public static readonly SIZE = 64;
    /**
     * マップ（迷路）の状態
     */
    public mapState: MapState;
    /**
     * タイルマップ
     */
    private readonly map: Phaser.Tilemaps.Tilemap;
    /**
     * タイルセット
     */
    private readonly tileset: Phaser.Tilemaps.Tileset;
    /**
     * レイヤー
     */
    private readonly layer: Phaser.Tilemaps.TilemapLayer;

    /**
     * タイルマップを生成する
     * マップ（迷路）の状態を生成する
     * @param scene シーン
     * @param tilesetName タイルセットの名前
     */
    constructor(scene: Phaser.Scene, tilesetName: string, mazeType: MazeType) {
        this.mapState = new MapState(mazeType);
        this.map = scene.make.tilemap({
            data: this.mapState.getField(),
            tileWidth: Tilemap.SIZE,
            tileHeight: Tilemap.SIZE,
        });
        this.tileset = this.getTileset(tilesetName, this.map);
        this.layer = this.getLayer(this.tileset);
    }

    /**
     * ワールド（画面上）の座標からタイルマップ（オセロのマス目）の座標を取得する
     * @params pos ワールドの座標
     * @returns タイルマップの座標
     */
    public getTilePos(pos: Phaser.Math.Vector2): Coord {
        const coord = this.layer.worldToTileXY(pos.x, pos.y);
        try {
            return new Coord(coord.x, coord.y);
        } catch {
            throw new Error('invalid coord by tilemap.ts: getTilePos()');
        }
    }

    /**
     * タイルマップ（オセロのマス目）の座標からワールド（画面上）の座標を取得する
     * @params coord タイルマップの座標
     * @returns ワールドの座標
     */
    public getWorldPos(coord: Coord): Phaser.Math.Vector2 {
        return this.layer.tileToWorldXY(coord.x, coord.y);
    }

    /**
     * タイルセットを取得する
     * @param name タイルセットの名前
     * @param map タイルマップ
     * @returns タイルセット
     */
    private getTileset(name: string, map: Phaser.Tilemaps.Tilemap): Phaser.Tilemaps.Tileset {
        const tileset = map.addTilesetImage(name);
        if (tileset == null) {
            throw new Error('tileset is null');
        }
        return tileset;
    }

    /**
     * レイヤーを取得する
     * @param tileset タイルセット
     * @returns レイヤー
     */
    private getLayer(tileset: Phaser.Tilemaps.Tileset): Phaser.Tilemaps.TilemapLayer {
        const layer = this.map?.createLayer(0, tileset);
        if (layer == null) {
            throw new Error('layer is null');
        }
        return layer;
    }
}
