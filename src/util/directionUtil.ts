export class DirectionUtil {
    /**
     * 4方向（上下左右）の差分
     */
    public static DIFF = [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: 0, y: -1 },
    ];

    /**
     * 3方向（下左右）の差分
     */
    public static DIFF_WITHOUT_UP = [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
    ];

    /**
     * 4方向（上下左右）の差分をシャッフルして返す
     * @returns 4方向（上下左右）の差分をシャッフルしたもの
     */
    public static getShuffle(): Phaser.Math.Vector2[] {
        const result = JSON.parse(JSON.stringify(DirectionUtil.DIFF));
        for (let i = result.length - 1; i > 0; i--) {
            const r = Math.floor(Math.random() * (i + 1));
            const tmp = result[i];
            result[i] = result[r];
            result[r] = tmp;
        }
        return result;
    }
}
