import { Coord } from '../model/coord/coord';
import { MoveDirection } from '../model/direction/moveDirection';
import { Tilemap } from '../model/map/tilemap';
import { Sprite } from '../model/sprite/sprite';

export class MoveService {
    /**
     * 移動方向と移動する時の差分をまとめたマップ
     */
    private readonly MAP: Map<MoveDirection, Phaser.Math.Vector2> = new Map<MoveDirection, Phaser.Math.Vector2>([
        [MoveDirection.Down, new Phaser.Math.Vector2(0, 1)],
        [MoveDirection.Up, new Phaser.Math.Vector2(0, -1)],
        [MoveDirection.Left, new Phaser.Math.Vector2(-1, 0)],
        [MoveDirection.Right, new Phaser.Math.Vector2(1, 0)],
        [MoveDirection.Idle, undefined],
    ]);

    /**
     * 移動先の座標を取得する（移動できない場合はundefinedを返す）
     * @param target 移動するターゲットのスプライト
     * @param tilemap タイルマップ
     * @param direction 移動方向
     * @returns 移動先の座標
     */
    public getMoveToCoord(target: Sprite, tilemap: Tilemap, direction: MoveDirection): Coord {
        const nowCoord: Coord = target.getCoord(tilemap);
        try {
            const nextCoord: Coord = nowCoord.addPos(this.MAP.get(direction));
            return tilemap.maze.isFloor(nextCoord) ? nextCoord : nowCoord;
        } catch {
            // 例外（移動先の座標がマップ[迷路のフィールド]外）の場合
            return nowCoord;
        }
    }
}
