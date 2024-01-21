import { Param } from '../param';
import { GoalAnimation } from '../static/goalAnimation';
import { Coord } from '../vo/coord';
import { Tilemap } from './tilemap';

export class Goal {
    private readonly SIZE: number = Tilemap.SIZE;
    /**
     * ゴールのスプライト
     */
    private readonly sprite: Phaser.GameObjects.Sprite;

    /**
     * ゴールを生成する
     * @param scene シーン
     * @param tilemap タイルマップ
     * @param spriteName スプライト名
     */
    constructor(scene: Phaser.Scene, tilemap: Tilemap, spriteName: string) {
        GoalAnimation.create(scene, spriteName);
        this.sprite = this.createSpriteByInitPos(scene, tilemap, spriteName);
        this.playAnimation();
    }

    /**
     * ゴールのスプライトを取得する
     * @returns ゴールのスプライト
     */
    public getSprite(): Phaser.GameObjects.Sprite {
        return this.sprite;
    }

    public playAnimation(): void {
        this.sprite.anims.play('goal');
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
        const coord: Coord = new Coord(
            Param.MAZE_SIZE - 2,
            Param.MAZE_SIZE - 2
        );
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
    private createSprite(
        scene: Phaser.Scene,
        pos: Phaser.Math.Vector2,
        spriteName: string
    ): Phaser.GameObjects.Sprite {
        return scene.add
            .sprite(pos.x, pos.y, spriteName)
            .setOrigin(0, 0)
            .setDisplaySize(this.SIZE, this.SIZE);
    }
}
