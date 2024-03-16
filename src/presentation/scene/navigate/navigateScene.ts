import { FontSize } from '../../../domain/model/text/fontSize';
import { Text } from '../../../domain/model/text/text';
import { MenuWindow } from './menuWindow';
import { Stick } from './stick';

/**
 * ゲームのナビゲートーシーン
 */
export class NavigateScene extends Phaser.Scene {
    /** ステージ */
    private stage: number;
    /** メニューウィンドウ */
    private menuWindow: MenuWindow;
    /** 操作スティック */
    private stick: Stick;

    constructor() {
        super({ key: 'navigateScene' });
    }

    /**
     * ゲームのナビゲートシーンの初期化
     * @param data シーンの初期化データ
     */
    init(data: any): void {
        this.stage = data.stage;
    }

    /**
     * ゲームのナビゲートーシーンの作成
     */
    create(): void {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // ステージの表示
        const stageText = Text.create(this, centerX, centerY, `ステージ ${this.stage}`, FontSize.Large);
        this.stick = new Stick(this);

        this.time.delayedCall(2000, () => {
            stageText.destroy();
            this.createMenuButton();
            this.menuWindow = new MenuWindow(this, this.stage);
            this.scene.launch('playScene', { stage: this.stage });
        });
    }

    /**
     * ゲームのナビゲートーシーンの更新
     */
    update(): void {
        this.stick.update();
    }

    /**
     * メニューボタンの作成
     */
    private createMenuButton(): void {
        const x = this.cameras.main.width - 80;
        const y = 30;

        Text.createButton(this, x, y, 'メニュー', FontSize.Normal).on('pointerdown', () => {
            this.menuWindow.toggleMenuWindow();
        });
    }
}
