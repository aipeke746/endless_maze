import { MoveDirectionType } from '../type/MoveDirectionType';

/**
 * 方向の差分に関するユーティリティ
 */
export class DirectionDiffUtil {
    /**
     * 移動方向と座標の差分のマップ
     */
    private static readonly MAP = new Map<MoveDirectionType, Phaser.Math.Vector2>([
        [MoveDirectionType.IDLE, new Phaser.Math.Vector2(0, 0)],
        [MoveDirectionType.UP, new Phaser.Math.Vector2(0, -1)],
        [MoveDirectionType.DOWN, new Phaser.Math.Vector2(0, 1)],
        [MoveDirectionType.LEFT, new Phaser.Math.Vector2(-1, 0)],
        [MoveDirectionType.RIGHT, new Phaser.Math.Vector2(1, 0)],
    ]);

    /**
     * 移動方向と反対の移動方向のマップ
     */
    private static readonly OPPNENT_DICTION = new Map<MoveDirectionType, MoveDirectionType>([
        [MoveDirectionType.IDLE, MoveDirectionType.IDLE],
        [MoveDirectionType.UP, MoveDirectionType.DOWN],
        [MoveDirectionType.DOWN, MoveDirectionType.UP],
        [MoveDirectionType.LEFT, MoveDirectionType.RIGHT],
        [MoveDirectionType.RIGHT, MoveDirectionType.LEFT],
    ]);

    public static readonly DIFF2: Phaser.Math.Vector2[] = [];

    /**
     * 4方向（上下左右）の差分
     */
    public static readonly DIFF: Phaser.Math.Vector2[] = [
        DirectionDiffUtil.MAP.get(MoveDirectionType.UP),
        DirectionDiffUtil.MAP.get(MoveDirectionType.DOWN),
        DirectionDiffUtil.MAP.get(MoveDirectionType.LEFT),
        DirectionDiffUtil.MAP.get(MoveDirectionType.RIGHT),
    ];

    /**
     * 3方向（下左右）の差分
     */
    public static readonly DIFF_WITHOUT_UP: Phaser.Math.Vector2[] = [
        DirectionDiffUtil.MAP.get(MoveDirectionType.DOWN),
        DirectionDiffUtil.MAP.get(MoveDirectionType.LEFT),
        DirectionDiffUtil.MAP.get(MoveDirectionType.RIGHT),
    ];

    /**
     * 4方向（上下左右）の差分をシャッフルして返す
     * @returns 4方向（上下左右）の差分をシャッフルしたもの
     */
    public static getShuffle(): Phaser.Math.Vector2[] {
        const result: Phaser.Math.Vector2[] = JSON.parse(JSON.stringify(DirectionDiffUtil.DIFF));
        for (let i = result.length - 1; i > 0; i--) {
            const r = Math.floor(Math.random() * (i + 1));
            const tmp = result[i];
            result[i] = result[r];
            result[r] = tmp;
        }
        return result;
    }

    /**
     * 差分から移動方向を返す
     * @param diff 差分
     * @returns 移動方向
     */
    public static getDirection(diff: Phaser.Math.Vector2): MoveDirectionType {
        for (const [key, value] of DirectionDiffUtil.MAP) {
            if (value.x === diff.x && value.y === diff.y) {
                return key;
            }
        }
    }

    /**
     * 差分の逆の移動方向を返す
     * @param diff 差分
     * @returns 逆の移動方向
     */
    public static getOpponentDirection(diff: Phaser.Math.Vector2): MoveDirectionType {
        const direction = DirectionDiffUtil.getDirection(diff);
        return DirectionDiffUtil.OPPNENT_DICTION.get(direction);
    }
}
