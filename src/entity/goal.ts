import { Param } from '../param';
import { AnimationService } from '../service/animation/animationService';
import { GoalAnimation } from '../service/animation/impl/goalAnimation';
import { Coord } from '../vo/coord';
import { Tilemap } from './tilemap';

/**
 * 迷路のゴールを管理するクラス
 */
export class Goal {
    private readonly SIZE: number = Tilemap.SIZE;
    /**
     * ゴールのスプライト
     */
    private readonly sprite: Phaser.GameObjects.Sprite;
    /**
     * ゴールのアニメーション
     */
    private readonly animation: AnimationService;

    /**
     * ゴールを生成する
     * @param scene シーン
     * @param tilemap タイルマップ
     * @param spriteName スプライト名
     */
    constructor(scene: Phaser.Scene, tilemap: Tilemap, spriteName: string) {
        this.sprite = this.createSpriteByInitPos(scene, tilemap, spriteName);
        this.animation = new GoalAnimation();
        this.animation.create(scene, spriteName);
        this.animation.play(this.sprite, GoalAnimation.KEY);
    }

    /**
     * ゴールのスプライトを取得する
     * @returns ゴールのスプライト
     */
    public getSprite(): Phaser.GameObjects.Sprite {
        return this.sprite;
    }

    public getCoord(tilemap: Tilemap): Coord {
        try {
            return tilemap.getTilePos(this.getPos());
        } catch {
            throw new Error('invalid coord by goal.ts: getCoord()');
        }
    }

    public getPos(): Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(this.sprite.x, this.sprite.y);
    }

    /**
     * ゴールのスプライトを初期位置（右下）に生成する
     * @param scene シーン
     * @param tilemap タイルマップ
     * @param spriteName スプライト名
     * @returns ゴールのスプライト
     */
    private createSpriteByInitPos(
        scene: Phaser.Scene,
        tilemap: Tilemap,
        spriteName: string
    ): Phaser.GameObjects.Sprite {
        const coord: Coord = new Coord(Param.MAZE_SIZE - 2, Param.MAZE_SIZE - 2);
        const pos: Phaser.Math.Vector2 = tilemap.getWorldPos(coord);
        return this.createSprite(scene, pos, spriteName);
    }

    /**
     * ゴールのスプライトを生成する
     * @param scene シーン
     * @param pos ワールドの座標
     * @param spriteName スプライト名
     * @returns ゴールのスプライト
     */
    private createSprite(scene: Phaser.Scene, pos: Phaser.Math.Vector2, spriteName: string): Phaser.GameObjects.Sprite {
        return scene.physics.add.sprite(pos.x, pos.y, spriteName).setOrigin(0, 0).setDisplaySize(this.SIZE, this.SIZE);
    }
}
