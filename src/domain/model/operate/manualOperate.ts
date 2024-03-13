import { Direction } from '../direction/direction';
import { MoveDirection } from '../direction/moveDirection';
import { SwipeDirection } from '../direction/swipeDirection';

/**
 * 外部入力（手動操作）からキャラクターを操作する
 *
 * PC: キーボードの上下左右キーでキャラクターを操作する
 * スマホ: スワイプでキャラクターを操作する
 */
export class ManualOperate {
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
     * スワイプの方向を取得する
     */
    private readonly swipeDirection: SwipeDirection = new SwipeDirection();
    /**
     * スワイプした方向とキャラクターの移動方向をまとめたマップ
     */
    private readonly directionMap = new Map<Direction, MoveDirection>([
        [Direction.Down, MoveDirection.Down],
        [Direction.Up, MoveDirection.Up],
        [Direction.Left, MoveDirection.Left],
        [Direction.Right, MoveDirection.Right],
        [Direction.Center, MoveDirection.Idle],
    ]);

    /**
     * カーソルキーとポインターを初期化する
     * @param scene シーン
     */
    constructor(scene: Phaser.Scene) {
        if (scene.input.keyboard == null) throw new Error('keyboard is null');
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.pointer = scene.input.pointer1;

        this.setPointerEvent(scene);
    }

    /**
     * 外部入力からキャラクターの移動方向を返す
     * @returns
     */
    public getDirection(): MoveDirection {
        const keyDirection = this.getKeyDirection();
        const swipeDirection = this.getSwipeDirection();

        return this.getKeyDirection() !== MoveDirection.Idle ? keyDirection : swipeDirection;
    }

    /**
     * 方向キーの入力からキャラクターの移動方向を返す
     * @returns キャラクターの移動方向
     */
    private getKeyDirection(): MoveDirection {
        if (this.cursors.right.isDown) {
            return MoveDirection.Right;
        } else if (this.cursors.left.isDown) {
            return MoveDirection.Left;
        } else if (this.cursors.down.isDown) {
            return MoveDirection.Down;
        } else if (this.cursors.up.isDown) {
            return MoveDirection.Up;
        }

        return MoveDirection.Idle;
    }

    /**
     * スワイプの入力からキャラクターの移動方向を返す
     * @returns キャラクターの移動方向
     */
    private getSwipeDirection(): MoveDirection {
        if (!this.isPointerDown) return MoveDirection.Idle;

        const swipeDirection = this.swipeDirection.getDirection(this.pointer);
        return this.directionMap.get(swipeDirection);
    }

    /**
     * ポインターのイベントを設定する
     * @param scene シーン
     */
    private setPointerEvent(scene: Phaser.Scene): void {
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
}
