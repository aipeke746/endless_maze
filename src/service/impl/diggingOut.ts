import { Param } from '../../param';
import { CellType } from '../../type/cellType';
import { DirectionUtil } from '../../util/directionUtil';
import { FieldUtil } from '../../util/fieldUtil';
import { MazeService } from '../mazeService';

/**
 * 迷路自動生成: 穴掘り法
 */
export class DiggingOut implements MazeService {
    /**
     * 生成を行う迷路
     */
    private maze: CellType[][] = [];
    /**
     * 穴掘り法で掘り進める位置
     */
    private readonly positions: Phaser.Math.Vector2[] = [];

    /**
     * 穴掘り法で迷路を生成する
     * @returns 迷路を生成する
     */
    public create(): CellType[][] {
        this.maze = FieldUtil.fill(CellType.WALL);
        this.createByDiggingOut();
        return this.maze;
    }

    /**
     * 穴掘り法で迷路を生成する
     */
    private createByDiggingOut(): void {
        const pos = this.getStartPos();

        this.maze[pos.y][pos.x] = CellType.FLOOR;
        this.positions.push(pos);

        while (this.positions.length > 0) {
            const next = this.positions.pop();
            this.dig(next);
        }
    }

    /**
     * 指定した位置から掘り進める
     * @param pos 掘り進める位置
     */
    private dig(pos: Phaser.Math.Vector2): void {
        for (const dir of DirectionUtil.getShuffle()) {
            const pos1 = pos.clone().add(dir);
            const pos2 = pos1.clone().add(dir);

            if (
                pos2.x >= 0 &&
                pos2.x < Param.MAZE_SIZE &&
                pos2.y >= 0 &&
                pos2.y < Param.MAZE_SIZE &&
                this.maze[pos2.y][pos2.x] === CellType.WALL
            ) {
                this.maze[pos1.y][pos1.x] = CellType.FLOOR;
                this.maze[pos2.y][pos2.x] = CellType.FLOOR;

                this.positions.push(pos);
                this.dig(pos2);
            }
        }
    }

    /**
     * スタート位置を取得する
     * @returns スタート位置
     */
    private getStartPos(): Phaser.Math.Vector2 {
        const x =
            Math.floor(Math.random() * ((Param.MAZE_SIZE - 1) / 2 - 1)) * 2 + 1;
        const y =
            Math.floor(Math.random() * ((Param.MAZE_SIZE - 1) / 2 - 1)) * 2 + 1;
        return new Phaser.Math.Vector2(x, y);
    }
}
