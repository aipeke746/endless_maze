import { StickAnimation } from '../../../domain/model/animation/sprite/stickAnimation';
import { Direction } from '../../../domain/model/direction/direction';
import { StickDirection } from '../../../domain/model/direction/stickDirection';
import { SwipeDirection } from '../../../domain/model/direction/swipeDirection';
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
     * スワイプした方向を取得する
     */
    private readonly swipeDirection: SwipeDirection = new SwipeDirection();
    /**
     * スワイプした方向とスティックの方向をまとめたマップ
     */
    private readonly directionMap = new Map<Direction, StickDirection>([
        [Direction.Down, StickDirection.Down],
        [Direction.Up, StickDirection.Up],
        [Direction.Left, StickDirection.Left],
        [Direction.Right, StickDirection.Right],
        [Direction.Center, StickDirection.Idle],
    ]);

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
        const swipeDirection = this.swipeDirection.getDirection(this.pointer);
        const stickDirection = this.directionMap.get(swipeDirection);
        this.stickAnimation.play(stickDirection);
    }

    /**
     * 画面にタッチされている状態のみ、スティックを表示する
     * @param scene シーン
     */
    private setPointerEvent(scene: Phaser.Scene): void {
        scene.input.on('pointerdown', () => {
            this._sprite.setCenterPos(this.pointer.position);
            this._sprite.visible();
        });

        scene.input.on('pointerup', () => {
            this._sprite.invisible();
        });
    }
}
