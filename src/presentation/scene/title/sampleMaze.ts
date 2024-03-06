import { Coord } from '../../../domain/model/coord/coord';
import { Tilemap } from '../../../domain/model/map/tilemap';
import { AutoOperate } from '../../../domain/model/operate/autoOperate';
import { Character } from '../../../domain/model/sprite/character/character';
import { Goal } from '../../../domain/model/sprite/goal/goal';

export class SampleMaze {
    /** 迷路のサイズ */
    private readonly MAZE_SIZE: number = 7;
    /** シーン */
    private readonly scene: Phaser.Scene;
    /** タイルマップ */
    private readonly tilemap: Tilemap;
    /** キャラクター */
    private readonly character: Character;
    /** プレイヤーの操作 */
    private readonly operate: AutoOperate;
    /** ゴール */
    private readonly goal: Goal;

    /**
     * サンプル迷路を生成する
     * @param scene シーン
     */
    constructor(scene: Phaser.Scene) {
        const centerX = scene.cameras.main.width / 2;
        const mazePosX = centerX - (Tilemap.SIZE * this.MAZE_SIZE) / 2;
        const mazePosY = 200;

        this.scene = scene;
        this.tilemap = new Tilemap(this.scene, 'mapTiles', this.MAZE_SIZE);
        this.tilemap.setPosition(mazePosX, mazePosY);
        this.goal = new Goal(this.scene, this.tilemap, 'goal', new Coord(this.MAZE_SIZE - 2, this.MAZE_SIZE - 2));
        this.character = new Character(this.scene, this.tilemap, 'character', new Coord(1, 1));
        this.character.setSlowMoveDuration();
        this.operate = new AutoOperate();

        this.reachGoal();
    }

    /**
     * 迷路のキャラクターを自動で動かす
     */
    public update(): void {
        const direction = this.operate.getDirection(
            this.tilemap.maze,
            this.character.sprite.getCoord(this.tilemap),
            this.goal.sprite.getCoord(this.tilemap)
        );
        this.character.walk(this.tilemap, direction);
    }

    /**
     * ゴールに到達したら、キャラクターを初期位置に戻す
     */
    private reachGoal(): void {
        this.scene.physics.add.collider(
            this.character.sprite.sprite,
            this.goal.sprite.sprite,
            () => {
                this.scene.time.delayedCall(1000, () => {
                    const initCoord = new Coord(1, 1);
                    const initPos = this.tilemap.getWorldPos(initCoord);
                    this.character.sprite.setPos(initPos);
                });
            },
            undefined,
            this
        );
    }
}
