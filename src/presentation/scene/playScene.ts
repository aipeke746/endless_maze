import { Character } from '../../domain/model/sprite/character/character';
import { Goal } from '../../domain/model/sprite/goal/goal';
import { Tilemap } from '../../domain/model/map/tilemap';
import { Param } from '../../param';
import { ManualOperate } from '../../domain/model/operate/manualOperate';

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
    private operate: ManualOperate;
    /**
     * ゴール
     */
    private goal: Goal;

    constructor() {
        super({ key: 'playScene' });
    }

    /**
     * ゲームのプレイシーンの準備
     */
    preload(): void {
        this.load.image('mapTiles', 'asset/tileset/mapTiles.png');
        this.load.spritesheet('character', 'asset/sprite/character.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet('goal', 'asset/sprite/goal.png', {
            frameWidth: 240,
            frameHeight: 240,
        });
    }

    /**
     * ゲームのプレイシーンの作成
     */
    create(): void {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.tilemap = new Tilemap(this, 'mapTiles');
        this.player = new Character(this, this.tilemap, 'character');
        this.operate = new ManualOperate(this);
        this.goal = new Goal(this, this.tilemap, 'goal');

        this.cameraSetting();
        this.reachGoal();
    }

    /**
     * ゲームのプレイシーンの更新
     */
    update(): void {
        const direction = this.operate.getDirection();
        this.player.walk(this.tilemap, direction);
    }

    /**
     * カメラの設定（プレイヤーに合わせて移動する）
     */
    private cameraSetting(): void {
        const bounds = Param.MAZE_SIZE * Tilemap.SIZE;
        this.cameras.main.setBounds(0, 0, bounds, bounds).startFollow(this.player.getMain().getSprite(), true);
    }

    /**
     * ゴールに到達した時の処理
     * 次の迷路コース、もしくはメニュー画面に遷移
     */
    private reachGoal(): void {
        this.physics.add.collider(
            this.player.getMain().getSprite(),
            this.goal.getMain().getSprite(),
            () => {
                this.time.delayedCall(200, () => {
                    this.scene.start('playScene');
                });
            },
            undefined,
            this
        );
    }
}
