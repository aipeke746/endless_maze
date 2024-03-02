import { MAZE_TYPE } from '../../domain/model/maze/generate/mazeType';
import { TextFactory } from '../../domain/model/text/textFactory';
import { Blink } from '../../domain/model/tween/blink';

/**
 * ゲームのメニューシーン
 */
export class MenuScene extends Phaser.Scene {
    /**
     * フォントサイズ
     */
    private readonly FONT_SIZE: number = 30;

    constructor() {
        super({ key: 'menuScene' });
    }

    /**
     * ゲームのメニューシーンの作成
     */
    create(): void {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.createStartText(centerX, centerY, 'ゲームスタート');
    }

    /**
     * ゲームをスタートする文字を作成
     * @param x ｘ座標
     * @param y ｙ座標
     * @param content 表示する文字列
     */
    private createStartText(x: number, y: number, content: string): void {
        const text = TextFactory.createButton(this, x, y, content, this.FONT_SIZE).on('pointerdown', () => {
            this.scene.start('playScene', {
                mazeType: MAZE_TYPE.StickKnockDown,
            });
        });
        const blinkTween: Blink = new Blink(this, text, 1000);
        blinkTween.start();
    }
}
