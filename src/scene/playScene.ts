import { Character } from '../entity/character';
import { Goal } from '../entity/goal';
import { Tilemap } from '../entity/tilemap';
import { Param } from '../param';
import { ManualImpl } from '../service/operate/impl/manualImpl';
import { OperateService } from '../service/operate/operateService';
import { MazeType } from '../type/mazeType';

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
    /**
     * ゴール
     */
    private goal: Goal;
    /**
     * 迷路のタイプ
     */
    private mazeType: MazeType;

    constructor() {
        super({ key: 'playScene' });
    }

    /**
     * ゲームのプレイシーンの初期設定
     */
    init(data: any): void {
        this.mazeType = data.mazeType as MazeType;
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
        this.tilemap = new Tilemap(this, 'mapTiles', this.mazeType);
        this.player = new Character(this, this.tilemap, 'character');
        this.operate = new ManualImpl(this);
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
        this.cameras.main
            .setBounds(0, 0, bounds, bounds)
            .startFollow(this.player.getSprite(), true);
    }

    /**
     * ゴールに到達した時の処理
     * 次の迷路コース、もしくはメニュー画面に遷移
     */
    private reachGoal(): void {
        this.physics.add.collider(
            this.player.getSprite(),
            this.goal.getSprite(),
            () => {
                this.getNextScene();
            },
            undefined,
            this
        );
    }

    /**
     * 次に遷移するシーンを取得する
     * @returns 次のシーン
     */
    private getNextScene(): Phaser.Scenes.ScenePlugin {
        const mazeTypeCount: number = Object.keys(MazeType).length / 2;
        const nextMazeType: MazeType = this.mazeType + 1;

        return nextMazeType < mazeTypeCount
            ? this.scene.start('playScene', { mazeType: nextMazeType })
            : this.scene.start('menuScene');
    }
}
