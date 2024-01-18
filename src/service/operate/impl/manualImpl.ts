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
     * キーボードの入力
     */
    private readonly cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene) {
        if (scene.input.keyboard == null) throw new Error('keyboard is null');
        this.cursors = scene.input.keyboard.createCursorKeys();
    }

    /**
     * 外部入力からキャラクターの移動方向を返す
     * @returns
     */
    getDirection(): MoveDirectionType {
        return this.getKeyDirection();
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
}
