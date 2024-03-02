/**
 * 対象を点滅させるtween
 */
export class Blink {
    /**
     * 点滅させる
     * @param _scene シーン
     * @param _target ターゲット
     * @param _duration 点滅の間隔
     */
    constructor(
        private readonly _scene: Phaser.Scene,
        private readonly _target: object | any[],
        private readonly _duration: number
    ) {}

    /**
     * 点滅を開始する
     */
    public start(): void {
        this._scene.tweens.add({
            targets: this._target,
            alpha: 0,
            duration: this._duration,
            ease: 'Sine.easeIn',
            repeat: -1,
            yoyo: true,
        });
    }

    /**
     * 点滅を停止する
     */
    public stop(): void {
        this._scene.tweens.killTweensOf(this._target);
    }
}
