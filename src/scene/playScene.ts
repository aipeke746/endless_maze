import { Character } from '../entity/character';
import { Tilemap } from '../entity/tilemap';
import { Param } from '../param';
import { ManulImpl as ManualImpl } from '../service/operate/impl/manualImpl';
import { OperateService } from '../service/operate/operateService';

/**
 * ゲームのプレイシーン
 */
export class PlayScene extends Phaser.Scene {
    /**
     * タイルマップ
     */
    private tilemap: Tilemap;
    /**
     * プレイヤー
     */
    private player: Character;
    /**
     * プレイヤーの操作
     */
    private operate: OperateService;

    constructor() {
        super({ key: 'playScene' });
    }

    /**
     * ゲームのプレイシーンの準備
     */
    preload(): void {
        this.load.image('mapTiles', 'asset/image/mapTiles.png');
        this.load.spritesheet('character', 'asset/sprite/character.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
    }

    /**
     * ゲームのプレイシーンの作成
     */
    create(): void {
        this.tilemap = new Tilemap(this, 'mapTiles');
        this.player = new Character(this, this.tilemap, 'character');
        this.operate = new ManualImpl(this);

        // カメラの設定（プレイヤーに合わせて移動する）
        const bounds = Param.MAZE_SIZE * Tilemap.SIZE;
        this.cameras.main
            .setBounds(0, 0, bounds, bounds)
            .startFollow(this.player.getSprite(), true);
    }

    /**
     * ゲームのプレイシーンの更新
     */
    update(): void {
        const direction = this.operate.getDirection();
        this.player.walk(this.tilemap, direction);
    }
}
