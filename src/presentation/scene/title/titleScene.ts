import { FontSize } from '../../../domain/model/text/fontSize';
import { Text } from '../../../domain/model/text/text';
import { Blink } from '../../../domain/model/tween/blink';
import { SampleMaze } from './sampleMaze';

/**
 * ゲームのタイトルシーン
 */
export class TitleScene extends Phaser.Scene {
    /** ステージ */
    private clearStage: number = 0;
    /** サンプル迷路 */
    private sampleMaze: SampleMaze;

    constructor() {
        super({ key: 'titleScene' });
    }

    /**
     * ゲームのタイトルシーンの初期化
     * @param data シーンの初期化データ
     */
    init(data: any): void {
        this.clearStage = data.stage;
    }

    /**
     * ゲームのタイトルシーンの準備
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
     * ゲームのタイトルシーンの作成
     */
    create(): void {
        const centerX = this.cameras.main.width / 2;
        const bottomY = this.cameras.main.height;

        // ゲームタイトル
        Text.create(this, centerX, 70, 'エ ン ド レ ス 迷 路', FontSize.Large);

        // 操作方法
        const operateContent = '＜移動方法＞\n  ・スマホ　： スワイプ\n  ・パソコン： 方向キー';
        Text.create(this, centerX, 150, operateContent, FontSize.Small);

        // 迷路のサンプル
        this.sampleMaze = new SampleMaze(this);

        // クリアステージ
        if (this.clearStage > 0) {
            Text.create(this, centerX, bottomY - 100, `クリアステージ：${this.clearStage}`, FontSize.Normal);
        }

        // ゲームスタートボタン
        this.createStartText(centerX, bottomY - 50, 'ゲームスタート');
    }

    /**
     * ゲームのタイトルシーンの更新
     */
    update(): void {
        this.sampleMaze.update();
    }

    /**
     * ゲームをスタートする文字を作成
     * @param x ｘ座標
     * @param y ｙ座標
     * @param content 表示する文字列
     */
    private createStartText(x: number, y: number, content: string): void {
        const text = Text.createButton(this, x, y, content, FontSize.Normal).on('pointerdown', () => {
            this.scene.start('navigateScene', {
                stage: 1,
            });
        });
        const blinkTween: Blink = new Blink(this, text, 1000);
        blinkTween.start();
    }
}
