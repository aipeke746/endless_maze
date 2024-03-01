import { Param } from '../../../../param';
import { CellType } from '../../../model/cell/cellType';
import { DirectionDiffService } from '../../direction/directionDiffService';
import { FieldUtil } from '../../../model/maze/fieldUtil';
import { Coord } from '../../../model/coord/coord';
import { MazeService } from '../mazeService';

/**
 * 迷路自動生成: 壁のばし法
 */
export class WallStretching implements MazeService {
    /**
     * 生成を行う迷路
     */
    private maze: CellType[][] = [];
    /**
     * 壁のばし法で掘り進める開始位置
     */
    private positions: Coord[] = [];
    /**
     * 移動方向の差分に関するサービス
     */
    private readonly directionDiffService: DirectionDiffService = new DirectionDiffService();

    /**
     * 壁のばし法で迷路を生成する
     * @returns 迷路を生成する
     */
    public create(): CellType[][] {
        this.maze = FieldUtil.circumference(CellType.WALL);
        this.createByWallStretching();
        return this.maze;
    }

    /**
     * 壁のばし法で迷路を生成する
     */
    private createByWallStretching(): void {
        this.setPositions();
        this.shufflePositions();

        while (this.positions.length > 0) {
            const next = this.positions.shift();
            this.createWall(next);
        }
    }

    /**
     * 壁を生成する
     * @param coord 壁を生成する位置
     */
    private createWall(coord: Coord): void {
        for (const dir of this.directionDiffService.getShuffle()) {
            try {
                const coord1 = coord.addPos(dir);
                const coord2 = coord1.addPos(dir);

                if (
                    this.maze[coord1.y][coord1.x] === CellType.FLOOR &&
                    this.maze[coord2.y][coord2.x] === CellType.FLOOR
                ) {
                    this.maze[coord1.y][coord1.x] = CellType.WALL;
                    this.maze[coord2.y][coord2.x] = CellType.WALL;

                    this.positions.unshift(coord2);
                    this.positions.push(coord);
                    break;
                }
            } catch {
                // 例外（座標がマップ[迷路のフィールド]外）の場合は何もしない
            }
        }
    }

    /**
     * 壁のばし法で掘り進める開始位置を設定する
     * 縦横奇数番目の壁（外周）の座標を全てセットする
     */
    private setPositions(): void {
        for (let y = 0; y < Param.MAZE_SIZE; y += 2) {
            this.positions.push(new Coord(0, y));
            this.positions.push(new Coord(Param.MAZE_SIZE - 1, y));
        }
        for (let x = 0; x < Param.MAZE_SIZE; x += 2) {
            this.positions.push(new Coord(x, 0));
            this.positions.push(new Coord(x, Param.MAZE_SIZE - 1));
        }
    }

    /**
     * 開始位置をシャッフルする
     */
    private shufflePositions(): void {
        const shufflePositions: Coord[] = [];
        while (this.positions.length > 0) {
            const index = Math.floor(Math.random() * this.positions.length);
            shufflePositions.push(this.positions[index]);
            this.positions.splice(index, 1);
        }
        this.positions = shufflePositions;
    }
}
