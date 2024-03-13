import { Direction } from './direction';

export class SwipeDirection {
    /**
     * スワイプの反応距離
     */
    private readonly reactionDiff = 50;

    /**
     * スワイプした方向を取得する
     * @param pointer ポインター
     * @returns スワイプした方向
     */
    public getDirection(pointer: Phaser.Input.Pointer): Direction {
        if (!pointer.isDown) return Direction.Center;

        const swipeVector = new Phaser.Geom.Point(
            pointer.position.x - pointer.downX,
            pointer.position.y - pointer.downY
        );

        const swipeMagnitude = Phaser.Geom.Point.GetMagnitude(swipeVector);
        const swipeNormal = new Phaser.Geom.Point(swipeVector.x / swipeMagnitude, swipeVector.y / swipeMagnitude);

        if (swipeMagnitude < this.reactionDiff) return Direction.Center;

        const { x: absX, y: absY } = new Phaser.Geom.Point(Math.abs(swipeNormal.x), Math.abs(swipeNormal.y));

        if (absX > absY) {
            return swipeNormal.x > 0 ? Direction.Right : Direction.Left;
        } else {
            return swipeNormal.y > 0 ? Direction.Down : Direction.Up;
        }
    }
}
