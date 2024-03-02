import { MoveDirection } from '../../model/direction/MoveDirection';

/**
 * 方向の差分に関するサービスクラス
 */
export class DirectionDiffService {
    /**
     * 移動方向と座標の差分のマップ
     */
    private readonly MAP = new Map<MoveDirection, Phaser.Math.Vector2>([
        [MoveDirection.IDLE, new Phaser.Math.Vector2(0, 0)],
        [MoveDirection.UP, new Phaser.Math.Vector2(0, -1)],
        [MoveDirection.DOWN, new Phaser.Math.Vector2(0, 1)],
        [MoveDirection.LEFT, new Phaser.Math.Vector2(-1, 0)],
        [MoveDirection.RIGHT, new Phaser.Math.Vector2(1, 0)],
    ]);

    /**
     * 移動方向と反対の移動方向のマップ
     */
    private readonly OPPNENT_DICTION = new Map<MoveDirection, MoveDirection>([
        [MoveDirection.IDLE, MoveDirection.IDLE],
        [MoveDirection.UP, MoveDirection.DOWN],
        [MoveDirection.DOWN, MoveDirection.UP],
        [MoveDirection.LEFT, MoveDirection.RIGHT],
        [MoveDirection.RIGHT, MoveDirection.LEFT],
    ]);

    /**
     * 4方向（上下左右）の差分
     */
    private readonly DIFF: Phaser.Math.Vector2[] = [
        this.MAP.get(MoveDirection.UP),
        this.MAP.get(MoveDirection.DOWN),
        this.MAP.get(MoveDirection.LEFT),
        this.MAP.get(MoveDirection.RIGHT),
    ];

    /**
     * 3方向（下左右）の差分
     */
    private readonly DIFF_WITHOUT_UP: Phaser.Math.Vector2[] = [
        this.MAP.get(MoveDirection.DOWN),
        this.MAP.get(MoveDirection.LEFT),
        this.MAP.get(MoveDirection.RIGHT),
    ];

    /**
     * 4方向(上下左右）の座標の差分を返す
     * @returns 4方向の座標の差分
     */
    public getDiff(): Phaser.Math.Vector2[] {
        return this.DIFF;
    }

    /**
     * 3方向（下左右）の座標の差分を返す
     * @returns 3方向の座標の差分
     */
    public getDiffWithoutUp(): Phaser.Math.Vector2[] {
        return this.DIFF_WITHOUT_UP;
    }

    /**
     * 4方向（上下左右）の差分をシャッフルして返す
     * @returns 4方向（上下左右）の差分をシャッフルしたもの
     */
    public getShuffle(): Phaser.Math.Vector2[] {
        const result: Phaser.Math.Vector2[] = JSON.parse(JSON.stringify(this.DIFF));
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
    public getDirection(diff: Phaser.Math.Vector2): MoveDirection {
        for (const [key, value] of this.MAP) {
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
    public getOpponentDirection(diff: Phaser.Math.Vector2): MoveDirection {
        const direction = this.getDirection(diff);
        return this.OPPNENT_DICTION.get(direction);
    }
}
