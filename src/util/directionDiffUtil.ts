/**
 * 方向の差分に関するユーティリティ
 */
export class DirectionDiffUtil {
    /**
     * 4方向（上下左右）の差分
     */
    public static readonly DIFF: Phaser.Math.Vector2[] = [
        new Phaser.Math.Vector2(1, 0),
        new Phaser.Math.Vector2(0, 1),
        new Phaser.Math.Vector2(-1, 0),
        new Phaser.Math.Vector2(0, -1),
    ];

    /**
     * 3方向（下左右）の差分
     */
    public static readonly DIFF_WITHOUT_UP: Phaser.Math.Vector2[] = [
        new Phaser.Math.Vector2(1, 0),
        new Phaser.Math.Vector2(0, 1),
        new Phaser.Math.Vector2(-1, 0),
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
}
