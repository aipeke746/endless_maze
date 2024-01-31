import { Tilemap } from '../../entity/tilemap';
import { MoveDirectionType } from '../../type/MoveDirectionType';
import { Coord } from '../../vo/coord';
import Phaser from 'phaser';
import { Sprite } from '../../vo/sprite';

/**
 * 移動に関連するサービス
 */
export class MoveService {
    /**
     * 移動方向と移動する時の差分をまとめたマップ
     */
    private readonly MAP: Map<MoveDirectionType, Phaser.Math.Vector2> = new Map<MoveDirectionType, Phaser.Math.Vector2>(
        [
            [MoveDirectionType.DOWN, new Phaser.Math.Vector2(0, 1)],
            [MoveDirectionType.UP, new Phaser.Math.Vector2(0, -1)],
            [MoveDirectionType.LEFT, new Phaser.Math.Vector2(-1, 0)],
            [MoveDirectionType.RIGHT, new Phaser.Math.Vector2(1, 0)],
            [MoveDirectionType.IDLE, undefined],
        ]
    );

    /**
     * 移動先の座標を取得する（移動できない場合はundefinedを返す）
     * @param target 移動するターゲットのスプライト
     * @param tilemap タイルマップ
     * @param direction 移動方向
     * @returns 移動先の座標
     */
    public getMoveToCoord(target: Sprite, tilemap: Tilemap, direction: MoveDirectionType): Coord {
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
