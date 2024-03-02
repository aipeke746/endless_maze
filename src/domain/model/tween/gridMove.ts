import { Coord } from '../coord/coord';
import { Tilemap } from '../map/tilemap';
import { Sprite } from '../sprite/sprite';

export class GridMove {
    /**
     * @param _target 移動するターゲットのスプライト
     */
    constructor(private readonly _target: Sprite) {}

    /**
     * 対象のスプライトをグリッド移動させる
     * @param tilemap タイルマップ
     * @param nextCoord 移動先の座標
     * @param onComplete 移動完了時の処理
     */
    public run(tilemap: Tilemap, nextCoord: Coord, onComplete: () => void): void {
        const nowPos = this._target.getPos();
        const nextPos = tilemap.getWorldPos(nextCoord);
        const sprite = this._target.getSprite();

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
