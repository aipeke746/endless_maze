import { MoveDirectionType } from '../../../type/MoveDirectionType';
import { OperateService } from '../operateService';

/**
 * 外部入力（手動操作）からキャラクターを操作する
 *
 * PC: キーボードの上下左右キーでキャラクターを操作する
 * スマホ: スワイプでキャラクターを操作する
 */
export class ManulImpl implements OperateService {
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

    constructor(scene: Phaser.Scene) {
        if (scene.input.keyboard == null) throw new Error('keyboard is null');
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.pointer = scene.input.activePointer;

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
    getDirection(): MoveDirectionType {
        const keyDirection = this.getKeyDirection();
        const swipeDirection = this.getSwipeDirection();

        return this.getKeyDirection() !== MoveDirectionType.IDLE
            ? keyDirection
            : swipeDirection;
    }

    /**
     * 方向キーの入力からキャラクターの移動方向を返す
     * @returns キャラクターの移動方向
     */
    private getKeyDirection(): MoveDirectionType {
        if (this.cursors.right.isDown) {
            return MoveDirectionType.RIGHT;
        } else if (this.cursors.left.isDown) {
            return MoveDirectionType.LEFT;
        } else if (this.cursors.down.isDown) {
            return MoveDirectionType.DOWN;
        } else if (this.cursors.up.isDown) {
            return MoveDirectionType.UP;
        }

        return MoveDirectionType.IDLE;
    }

    /**
     * スワイプの入力からキャラクターの移動方向を返す
     * @returns キャラクターの移動方向
     */
    private getSwipeDirection(): MoveDirectionType {
        if (!this.isPointerDown) return MoveDirectionType.IDLE;
        return this.onSwipe();
    }

    /**
     * スワイプの方向を返す
     * @returns スワイプの方向
     */
    private onSwipe(): MoveDirectionType {
        const swipeVector = new Phaser.Geom.Point(
            this.pointer.position.x - this.pointer.downX,
            this.pointer.position.y - this.pointer.downY
        );

        const swipeMagnitude = Phaser.Geom.Point.GetMagnitude(swipeVector);
        const swipeNormal = new Phaser.Geom.Point(
            swipeVector.x / swipeMagnitude,
            swipeVector.y / swipeMagnitude
        );

        if (swipeMagnitude < 50) return MoveDirectionType.IDLE;

        const { x: absX, y: absY } = new Phaser.Geom.Point(
            Math.abs(swipeNormal.x),
            Math.abs(swipeNormal.y)
        );

        if (absX > absY) {
            return swipeNormal.x > 0
                ? MoveDirectionType.RIGHT
                : MoveDirectionType.LEFT;
        } else {
            return swipeNormal.y > 0
                ? MoveDirectionType.DOWN
                : MoveDirectionType.UP;
        }
    }
}
