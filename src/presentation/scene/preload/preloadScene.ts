export class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'preloadScene' });
    }

    /** ゲームのプレロード */
    preload(): void {
        this.load.image('mapTiles', 'asset/tileset/mapTiles.png');
        this.load.image('frame', 'asset/image/frame.png');
        this.load.spritesheet('character', 'asset/sprite/character.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet('goal', 'asset/sprite/goal.png', {
            frameWidth: 240,
            frameHeight: 240,
        });
        this.load.spritesheet('stick', 'asset/sprite/stick.png', {
            frameWidth: 128,
            frameHeight: 128,
        });
    }

    /** タイトル画面に遷移 */
    create(): void {
        this.scene.start('titleScene');
    }
}
