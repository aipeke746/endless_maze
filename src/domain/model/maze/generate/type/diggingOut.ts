import { Param } from '../../../../../param';
import { Cell } from '../../../cell/cell';
import { FieldUtil } from '../../fieldUtil';
import { Coord } from '../../../coord/coord';
import { MoveDirectionDiff } from '../../../direction/moveDirectionDiff';
import { MazeGenerate } from '../mazeFactory';

/**
 * 迷路自動生成: 穴掘り法
 */
export class DiggingOut implements MazeGenerate {
    /**
     * 生成を行う迷路
     */
    private maze: Cell[][] = [];
    /**
     * 穴掘り法で掘り進める位置
     */
    private readonly positions: Coord[] = [];
    /**
     * 移動方向の差分に関するサービス
     */
    private readonly directionDiffService: MoveDirectionDiff = new MoveDirectionDiff();

    /**
     * 穴掘り法で迷路を生成する
     * @returns 迷路を生成する
     */
    public create(): Cell[][] {
        this.maze = FieldUtil.fill(Cell.Wall);
        this.createByDiggingOut();
        return this.maze;
    }

    /**
     * 穴掘り法で迷路を生成する
     */
    private createByDiggingOut(): void {
        const coord = this.getStartCoord();

        this.maze[coord.y][coord.x] = Cell.Floor;
        this.positions.push(coord);

        while (this.positions.length > 0) {
            const next = this.positions.pop();
            this.dig(next);
        }
    }

    /**
     * 指定した位置から掘り進める
     * @param coord 掘り進める位置
     */
    private dig(coord: Coord): void {
        for (const dir of this.directionDiffService.getShuffle()) {
            try {
                const coord1 = coord.addPos(dir);
                const coord2 = coord1.addPos(dir);

                if (this.maze[coord2.y][coord2.x] === Cell.Wall) {
                    this.maze[coord1.y][coord1.x] = Cell.Floor;
                    this.maze[coord2.y][coord2.x] = Cell.Floor;

                    this.positions.push(coord);
                    this.dig(coord2);
                }
            } catch {
                // 例外（座標がマップ[迷路のフィールド]外）の場合は何もしない
            }
        }
    }

    /**
     * スタート位置を取得する
     * @returns スタート位置
     */
    private getStartCoord(): Coord {
        const x = Math.floor(Math.random() * ((Param.MAZE_SIZE - 1) / 2 - 1)) * 2 + 1;
        const y = Math.floor(Math.random() * ((Param.MAZE_SIZE - 1) / 2 - 1)) * 2 + 1;

        return new Coord(x, y);
    }
}
