/**
 * 対象を点滅させるtween
 */
export class Blink {
    /**
     * 点滅させる
     * @param scene シーン
     * @param target ターゲット
     * @param duration 点滅の間隔
     */
    constructor(
        private readonly scene: Phaser.Scene,
        private readonly target: object | any[],
        private readonly duration: number
    ) {}

    /**
     * 点滅を開始する
     */
    public start(): void {
        this.scene.tweens.add({
            targets: this.target,
            alpha: 0,
            duration: this.duration,
            ease: 'Sine.easeIn',
            repeat: -1,
            yoyo: true,
        });
    }

    /**
     * 点滅を停止する
     */
    public stop(): void {
        this.scene.tweens.killTweensOf(this.target);
    }
}
