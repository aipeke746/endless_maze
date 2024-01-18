import { Character } from '../../entity/character';
import { Tilemap } from '../../entity/tilemap';
import { MoveDirectionType } from '../../type/MoveDirectionType';
import { Coord } from '../../vo/coord';

/**
 * 移動を行うサービス
 */
export class MoveService {
    /**
     * 移動先の座標を取得する（移動できない場合はundefinedを返す）
     * @param target 移動するターゲット
     * @param tilemap タイルマップ
     * @param direction 移動方向
     * @returns 移動先の座標
     */
    public getMoveToCoord(
        target: Character,
        tilemap: Tilemap,
        direction: MoveDirectionType
    ): Coord | undefined {
        const nowCoord = tilemap.getTilePos(target.getPos());
        let nextCoord: Coord;
        switch (direction) {
            case MoveDirectionType.DOWN:
                nextCoord = new Coord(nowCoord.x, nowCoord.y + 1);
                break;
            case MoveDirectionType.UP:
                nextCoord = new Coord(nowCoord.x, nowCoord.y - 1);
                break;
            case MoveDirectionType.LEFT:
                nextCoord = new Coord(nowCoord.x - 1, nowCoord.y);
                break;
            case MoveDirectionType.RIGHT:
                nextCoord = new Coord(nowCoord.x + 1, nowCoord.y);
                break;
        }
        return tilemap.mapState.isFloor(nextCoord) ? nextCoord : undefined;
    }

    /**
     * キャラクターをグリッド移動させる
     * @param target 移動するターゲット
     * @param tilemap タイルマップ
     * @param nextCoord 移動先の座標
     * @param onComplete 移動完了時の処理
     */
    public gridMoveTween(
        target: Character,
        tilemap: Tilemap,
        nextCoord: Coord,
        onComplete: () => void
    ): void {
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
