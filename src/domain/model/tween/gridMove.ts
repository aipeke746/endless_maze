import { Coord } from '../coord/coord';
import { Tilemap } from '../map/tilemap';
import { Sprite } from '../sprite/sprite';

export class GridMove {
    /**
     * @param target 移動するターゲットのスプライト
     * @param duration 移動にかかる時間
     */
    constructor(
        private readonly target: Sprite,
        private duration
    ) {}

    /**
     * 対象のスプライトをグリッド移動させる
     * @param tilemap タイルマップ
     * @param nextCoord 移動先の座標
     * @param onComplete 移動完了時の処理
     */
    public run(tilemap: Tilemap, nextCoord: Coord, onComplete: () => void): void {
        const nowPos = this.target.getPos();
        const nextPos = tilemap.getWorldPos(nextCoord);
        const sprite = this.target.sprite;

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
            duration: this.duration,
            onComplete: () => {
                tween.stop();
                onComplete();
            },
        });
    }

    /**
     * 移動にかかる時間を設定する
     * @param duration 移動にかかる時間
     */
    public setDuration(duration: number): void {
        this.duration = duration;
    }
}
