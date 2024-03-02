import { Tilemap } from '../../model/map/tilemap';
import { MOVE_DIRECTION, MoveDirection } from '../../model/direction/MoveDirection';
import { Coord } from '../../model/coord/coord';
import Phaser from 'phaser';
import { Sprite } from '../../model/sprite/sprite';

/**
 * 移動に関連するサービス
 */
export class MoveService {
    /**
     * 移動方向と移動する時の差分をまとめたマップ
     */
    private readonly MAP: Map<MoveDirection, Phaser.Math.Vector2> = new Map<MoveDirection, Phaser.Math.Vector2>([
        [MOVE_DIRECTION.DOWN, new Phaser.Math.Vector2(0, 1)],
        [MOVE_DIRECTION.UP, new Phaser.Math.Vector2(0, -1)],
        [MOVE_DIRECTION.LEFT, new Phaser.Math.Vector2(-1, 0)],
        [MOVE_DIRECTION.RIGHT, new Phaser.Math.Vector2(1, 0)],
        [MOVE_DIRECTION.IDLE, undefined],
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
            return tilemap.mapState.isFloor(nextCoord) ? nextCoord : nowCoord;
        } catch {
            // 例外（移動先の座標がマップ[迷路のフィールド]外）の場合
            return nowCoord;
        }
    }

    /**
     * 対象のスプライトをグリッド移動させる
     * @param target 移動するターゲットのスプライト
     * @param tilemap タイルマップ
     * @param nextCoord 移動先の座標
     * @param onComplete 移動完了時の処理
     */
    public gridMoveTween(target: Sprite, tilemap: Tilemap, nextCoord: Coord, onComplete: () => void): void {
        const nowPos = target.getPos();
        const nextPos = tilemap.getWorldPos(nextCoord);
        const sprite = target.getSprite();

        const tween: Phaser.Tweens.Tween = sprite.scene.add.tween({
            targets: [sprite],
            x: {
                getStart: () => nowPos.x,
                getEnd: () => nextPos.x,
            },
            y: {
                getStart: () => nowPos.y,
                getEnd: () => nextPos.y,
            },
            duration: 200,
            onComplete: () => {
                tween.stop();
                onComplete();
            },
        });
    }
}
