import { Character } from '../../domain/model/sprite/character/character';
import { Goal } from '../../domain/model/sprite/goal/goal';
import { Tilemap } from '../../domain/model/map/tilemap';
import { ManualOperate } from '../../domain/model/operate/manualOperate';
import { Maze } from '../../domain/model/maze/maze';

/**
 * ゲームのプレイシーン
 */
export class PlayScene extends Phaser.Scene {
    /** ステージに対する迷路の大きさの拡大率 */
    private readonly MAZE_SIZE_RATE: number = 4;
    /** ステージ */
    private stage: number;
    /** タイルマップ */
    private tilemap: Tilemap;
    /** プレイヤー */
    private player: Character;
    /** プレイヤーの操作 */
    private operate: ManualOperate;
    /** ゴール */
    private goal: Goal;

    constructor() {
        super({ key: 'playScene' });
    }

    /**
     * ゲームのプレイシーンの初期化
     * @param data シーンの初期化データ
     */
    init(data: any): void {
        this.stage = data.stage;
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

        const mazeSize = this.stage * this.MAZE_SIZE_RATE + 7; // 迷路の大きさは奇数にすること
        this.tilemap = new Tilemap(this, 'mapTiles', mazeSize);
        this.goal = new Goal(this, this.tilemap, 'goal');
        this.player = new Character(this, this.tilemap, 'character');
        this.operate = new ManualOperate(this);

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
        const bounds = Maze.SIZE * Tilemap.SIZE;
        this.cameras.main.setBounds(0, 0, bounds, bounds).startFollow(this.player.sprite.sprite);
    }

    /**
     * ゴールに到達したら、次の迷路コースへ
     */
    private reachGoal(): void {
        this.physics.add.collider(
            this.player.sprite.sprite,
            this.goal.sprite.sprite,
            () => {
                this.time.delayedCall(150, () => {
                    this.scene.start('parameterScene', { stage: this.stage + 1 });
                });
            },
            undefined,
            this
        );
    }
}
