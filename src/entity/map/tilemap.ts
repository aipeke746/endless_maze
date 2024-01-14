import { Coord } from '../../vo/coord';
import { MapState } from './mapState';

export class Tilemap {
    public mapState: MapState;
    private readonly map: Phaser.Tilemaps.Tilemap;
    private readonly tileset: Phaser.Tilemaps.Tileset;
    private readonly layer: Phaser.Tilemaps.TilemapLayer;

    constructor(scene: Phaser.Scene, tilesetName: string) {
        this.mapState = new MapState();
        this.map = scene.make.tilemap({
            data: this.mapState.getField(),
            tileWidth: MapState.SIZE,
            tileHeight: MapState.SIZE,
        });
        this.tileset = this.getTileset(tilesetName, this.map);
        this.layer = this.getLayer(this.tileset);
    }

    /**
     * ワールド（画面上）の座標からタイルマップ（オセロのマス目）の座標を取得する
     * @params pos ワールドの座標
     * @returns タイルマップの座標
     */
    public getTilePos(pos: Phaser.Math.Vector2): Phaser.Math.Vector2 {
        return this.layer.worldToTileXY(pos.x, pos.y);
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
    private getTileset(
        name: string,
        map: Phaser.Tilemaps.Tilemap
    ): Phaser.Tilemaps.Tileset {
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
    private getLayer(
        tileset: Phaser.Tilemaps.Tileset
    ): Phaser.Tilemaps.TilemapLayer {
        const layer = this.map?.createLayer(0, tileset);
        if (layer == null) {
            throw new Error('layer is null');
        }
        return layer;
    }
}
