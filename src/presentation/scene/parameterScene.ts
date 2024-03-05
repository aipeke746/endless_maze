import { Text } from '../../domain/model/text/text';

/**
 * ゲームのパラメーターシーン
 */
export class ParameterScene extends Phaser.Scene {
    /** フォントサイズ */
    private readonly FONT_SIZE: number = 30;
    /** ステージ */
    private stage: number;

    constructor() {
        super({ key: 'parameterScene' });
    }

    /**
     * ゲームのパラメータシーンの初期化
     * @param data シーンの初期化データ
     */
    init(data: any): void {
        this.stage = data.stage;
    }

    /**
     * ゲームのパラメーターシーンの作成
     */
    create(): void {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // ステージの表示
        const stageText = Text.create(this, centerX, centerY, `ステージ ${this.stage}`, this.FONT_SIZE * 2);

        this.time.delayedCall(2000, () => {
            stageText.destroy();
            this.createMenuButton();
            this.scene.launch('playScene', { stage: this.stage });
        });
    }

    private createMenuButton(): void {
        const x = this.cameras.main.width - 80;
        const y = 30;
        const menuButton = Text.createButton(this, x, y, 'メニュー', this.FONT_SIZE);
        menuButton.on('pointerdown', () => {
            this.scene.stop('playScene');
            this.scene.start('menuScene');
        });
    }
}
