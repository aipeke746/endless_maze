import { Tilemap } from '../entity/map/tilemap';

export class PlayScene extends Phaser.Scene {
    private tilemap: Tilemap;

    constructor() {
        super({ key: 'playScene' });
    }

    preload(): void {
        this.load.image('mapTiles', 'asset/image/mapTiles.png');
    }

    create(): void {
        this.tilemap = new Tilemap(this, 'mapTiles');
        console.log(this.tilemap);
    }
}
