import { MoveDirection } from '../../../model/direction/MoveDirection';
import { OperateService } from '../operateService';

/**
 * 外部入力（手動操作）からキャラクターを操作する
 *
 * PC: キーボードの上下左右キーでキャラクターを操作する
 * スマホ: スワイプでキャラクターを操作する
 */
export class ManualImpl implements OperateService {
    /**
     * キーボード入力
     */
    private readonly cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    /**
     * ポインター入力
     */
    private readonly pointer: Phaser.Input.Pointer;
    /**
     * ポインターが押されているかどうか
     */
    private isPointerDown: boolean = false;

    /**
     * カーソルキーとポインターを初期化する
     * @param scene シーン
     */
    constructor(scene: Phaser.Scene) {
        if (scene.input.keyboard == null) throw new Error('keyboard is null');
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.pointer = scene.input.pointer1;

        // スワイプ用のイベントを設定する
        scene.input.on(
            'pointerdown',
            () => {
                this.isPointerDown = true;
            },
            this
        );
        scene.input.on(
            'pointerup',
            () => {
                this.isPointerDown = false;
            },
            this
        );
    }

    /**
     * 外部入力からキャラクターの移動方向を返す
     * @returns
     */
    getDirection(): MoveDirection {
        const keyDirection = this.getKeyDirection();
        const swipeDirection = this.getSwipeDirection();

        return this.getKeyDirection() !== MoveDirection.IDLE ? keyDirection : swipeDirection;
    }

    /**
     * 方向キーの入力からキャラクターの移動方向を返す
     * @returns キャラクターの移動方向
     */
    private getKeyDirection(): MoveDirection {
        if (this.cursors.right.isDown) {
            return MoveDirection.RIGHT;
        } else if (this.cursors.left.isDown) {
            return MoveDirection.LEFT;
        } else if (this.cursors.down.isDown) {
            return MoveDirection.DOWN;
        } else if (this.cursors.up.isDown) {
            return MoveDirection.UP;
        }

        return MoveDirection.IDLE;
    }

    /**
     * スワイプの入力からキャラクターの移動方向を返す
     * @returns キャラクターの移動方向
     */
    private getSwipeDirection(): MoveDirection {
        if (!this.isPointerDown) return MoveDirection.IDLE;
        return this.onSwipe();
    }

    /**
     * スワイプの方向を返す
     * @returns スワイプの方向
     */
    private onSwipe(): MoveDirection {
        const swipeVector = new Phaser.Geom.Point(
            this.pointer.position.x - this.pointer.downX,
            this.pointer.position.y - this.pointer.downY
        );

        const swipeMagnitude = Phaser.Geom.Point.GetMagnitude(swipeVector);
        const swipeNormal = new Phaser.Geom.Point(swipeVector.x / swipeMagnitude, swipeVector.y / swipeMagnitude);

        if (swipeMagnitude < 50) return MoveDirection.IDLE;

        const { x: absX, y: absY } = new Phaser.Geom.Point(Math.abs(swipeNormal.x), Math.abs(swipeNormal.y));

        if (absX > absY) {
            return swipeNormal.x > 0 ? MoveDirection.RIGHT : MoveDirection.LEFT;
        } else {
            return swipeNormal.y > 0 ? MoveDirection.DOWN : MoveDirection.UP;
        }
    }
}
