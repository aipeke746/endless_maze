import { Coord } from '../../domain/model/coord/coord';
import { Tilemap } from '../../domain/model/map/tilemap';
import { AutoOperate } from '../../domain/model/operate/autoOperate';
import { Character } from '../../domain/model/sprite/character/character';
import { Goal } from '../../domain/model/sprite/goal/goal';
import { Text } from '../../domain/model/text/text';
import { Blink } from '../../domain/model/tween/blink';

/**
 * ゲームのメニューシーン
 */
export class MenuScene extends Phaser.Scene {
    /**
     * フォントサイズ
     */
    private readonly FONT_SIZE: number = 30;
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
    private operate: AutoOperate;
    /**
     * ゴール
     */
    private goal: Goal;

    constructor() {
        super({ key: 'menuScene' });
    }

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
     * ゲームのメニューシーンの作成
     */
    create(): void {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        const bottomY = this.cameras.main.height;

        this.createTitleText(centerX, 80, 'エ ン ド レ ス 迷 路');
        this.createStartText(centerX, bottomY - 80, 'ゲームスタート');

        const mazeSize = 7;
        this.tilemap = new Tilemap(this, 'mapTiles', mazeSize);
        this.tilemap.setPosition(centerX - (Tilemap.SIZE * mazeSize) / 2, centerY - (Tilemap.SIZE * mazeSize) / 2);

        this.goal = new Goal(this, this.tilemap, 'goal', new Coord(mazeSize - 2, mazeSize - 2));
        this.player = new Character(this, this.tilemap, 'character', new Coord(1, 1));
        this.operate = new AutoOperate();

        this.reachGoal();
    }

    update(): void {
        const direction = this.operate.getDirection(
            this.tilemap.maze,
            this.player.sprite.getCoord(this.tilemap),
            this.goal.sprite.getCoord(this.tilemap)
        );
        this.player.walk(this.tilemap, direction);
    }

    /**
     * ゴールに到達した時の処理
     * 次の迷路コース、もしくはメニュー画面に遷移
     */
    private reachGoal(): void {
        this.physics.add.collider(
            this.player.sprite.sprite,
            this.goal.sprite.sprite,
            () => {
                this.time.delayedCall(500, () => {
                    const initCoord = new Coord(1, 1);
                    const initPos = this.tilemap.getWorldPos(initCoord);
                    this.player.sprite.setPos(initPos);
                });
            },
            undefined,
            this
        );
    }

    private createTitleText(x: number, y: number, content: string): void {
        Text.create(this, x, y, content, this.FONT_SIZE);
    }

    /**
     * ゲームをスタートする文字を作成
     * @param x ｘ座標
     * @param y ｙ座標
     * @param content 表示する文字列
     */
    private createStartText(x: number, y: number, content: string): void {
        const text = Text.createButton(this, x, y, content, this.FONT_SIZE).on('pointerdown', () => {
            this.scene.start('playScene', {
                stage: 1,
            });
        });
        const blinkTween: Blink = new Blink(this, text, 1000);
        blinkTween.start();
    }
}
