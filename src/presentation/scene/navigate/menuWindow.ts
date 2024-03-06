import { FontSize } from '../../../domain/model/text/fontSize';
import { Text } from '../../../domain/model/text/text';

export class MenuWindow {
    /** メニューウィンドウのフレーム */
    private readonly frame: Phaser.GameObjects.Image;
    /** ステージ */
    private readonly stageText: Phaser.GameObjects.Text;
    /** タイトル画面に遷移するボタン */
    private readonly titleButton: Phaser.GameObjects.Text;
    /** 閉じるボタン */
    private readonly closeButton: Phaser.GameObjects.Text;
    /** メニューウィンドウの表示フラグ */
    private isOpenWindow: boolean = false;

    /**
     * メニュウィンドウの作成
     * @param scene シーン
     */
    constructor(
        private readonly scene: Phaser.Scene,
        private readonly stage: number
    ) {
        const centerX = this.scene.cameras.main.width / 2;
        const centerY = this.scene.cameras.main.height / 2;

        this.frame = this.scene.add.image(centerX, centerY, 'frame');
        this.stageText = Text.create(this.scene, centerX, centerY - 20, `ステージ ${this.stage}`, FontSize.Large);
        this.titleButton = Text.createButton(this.scene, centerX - 90, centerY + 60, 'タイトルへ', FontSize.Normal).on(
            'pointerdown',
            () => {
                this.scene.scene.stop('playScene');
                this.scene.scene.start('titleScene', { stage: this.stage - 1 });
            }
        );
        this.closeButton = Text.createButton(this.scene, centerX + 120, centerY + 60, '閉じる', FontSize.Normal).on(
            'pointerdown',
            () => {
                this.closeMenuWindow();
            }
        );
        this.closeMenuWindow();
    }

    /**
     * メニューウィンドウの表示/非表示
     */
    public toggleMenuWindow(): void {
        this.isOpenWindow = !this.isOpenWindow;
        this.isOpenWindow ? this.openMenuWindow() : this.closeMenuWindow();
    }

    /**
     * ウィンドメニューを閉じる
     */
    private closeMenuWindow(): void {
        this.frame.setAlpha(0);
        this.stageText.setAlpha(0);
        this.titleButton.setAlpha(0);
        this.closeButton.setAlpha(0);
        this.isOpenWindow = false;
    }

    /**
     * ウィンドメニューを開く
     */
    private openMenuWindow(): void {
        this.frame.setAlpha(1);
        this.stageText.setAlpha(1);
        this.titleButton.setAlpha(1);
        this.closeButton.setAlpha(1);
        this.isOpenWindow = true;
    }
}
