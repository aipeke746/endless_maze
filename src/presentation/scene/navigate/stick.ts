import { StickAnimation } from '../../../domain/model/animation/sprite/stickAnimation';
import { StickDirection } from '../../../domain/model/direction/stickDirection';
import { Sprite } from '../../../domain/model/sprite/sprite';

export class Stick {
    /**
     * スティックのスプライト
     */
    private readonly _sprite: Sprite;
    /**
     * スティックのアニメーション
     */
    private readonly stickAnimation: StickAnimation;
    /**
     * ポインター
     */
    private readonly pointer: Phaser.Input.Pointer;

    /**
     * スティックを生成する
     * @param scene シーン
     */
    constructor(private readonly scene: Phaser.Scene) {
        this.pointer = scene.input.pointer1;

        const initPos = new Phaser.Math.Vector2(5, 5); // 初期状態は非表示のため、適当な場所を指定
        this._sprite = Sprite.createByPos(scene, 'stick', initPos);
        this._sprite.invisible();
        this._sprite.setSize(128);

        this.stickAnimation = new StickAnimation(this.scene, this._sprite, 'stick');

        this.setPointerEvent(scene);
    }

    /**
     * スティックの更新
     */
    public update(): void {
        if (!this.pointer.isDown) return;

        const swipeVector = new Phaser.Geom.Point(
            this.pointer.position.x - this.pointer.downX,
            this.pointer.position.y - this.pointer.downY
        );

        const swipeMagnitude = Phaser.Geom.Point.GetMagnitude(swipeVector);
        const swipeNormal = new Phaser.Geom.Point(swipeVector.x / swipeMagnitude, swipeVector.y / swipeMagnitude);

        if (swipeMagnitude < 50) return;

        const { x: absX, y: absY } = new Phaser.Geom.Point(Math.abs(swipeNormal.x), Math.abs(swipeNormal.y));

        if (absX > absY) {
            swipeNormal.x > 0
                ? this.stickAnimation.play(StickDirection.Right)
                : this.stickAnimation.play(StickDirection.Left);
        } else {
            swipeNormal.y > 0
                ? this.stickAnimation.play(StickDirection.Down)
                : this.stickAnimation.play(StickDirection.Up);
        }
    }

    /**
     * 画面にタッチされている状態のみ、スティックを表示する
     * @param scene シーン
     */
    private setPointerEvent(scene: Phaser.Scene): void {
        scene.input.on('pointerdown', () => {
            this._sprite.setPos(this.pointer.position);
            this._sprite.visible();
        });

        scene.input.on('pointerup', () => {
            this._sprite.invisible();
        });
    }
}
