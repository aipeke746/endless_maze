import { Param } from '../../../../../param';
import { Cell } from '../../../cell/cell';
import { MoveDirectionDiff } from '../../../direction/moveDirectionDiff';
import { FieldUtil } from '../../fieldUtil';
import { Coord } from '../../../coord/coord';
import { MazeGenerate } from '../mazeFactory';

/**
 * 迷路自動生成: 棒倒し法
 */
export class StickKnockDown implements MazeGenerate {
    /**
     * 移動方向の差分に関するサービス
     */
    private readonly directionDiffService: MoveDirectionDiff = new MoveDirectionDiff();

    /**
     * 棒倒し法で迷路を生成する
     * @returns 迷路を生成する
     */
    public create(): Cell[][] {
        return this.stickKnockDown(this.setupBase());
    }

    /**
     * 迷路の土台を作成する（外周と偶数行列を壁にする）
     * @returns 迷路の土台
     */
    private setupBase(): Cell[][] {
        const base: Cell[][] = FieldUtil.circumference(Cell.Wall);
        for (let y = 0; y < Param.MAZE_SIZE - 2; y += 2) {
            for (let x = 0; x < Param.MAZE_SIZE - 2; x += 2) {
                base[y][x] = Cell.Wall;
            }
        }
        return base;
    }

    /**
     * setupで作成した迷路の土台に棒倒し法を適用する
     * 偶数行・列にセットした壁の4方向（上下左右）のいずれかを壁にする
     * 2行目以降は上方向に壁を作らない（3方向の下左右のいずれかを壁にする）
     * @param base 迷路の土台（setupBaseで作成した迷路）
     * @returns 棒倒し法を適用した迷路
     */
    private stickKnockDown(base: Cell[][]): Cell[][] {
        const maze = JSON.parse(JSON.stringify(base));

        for (let y = 2; y < Param.MAZE_SIZE - 2; y += 2) {
            for (let x = 2; x < Param.MAZE_SIZE - 2; x += 2) {
                const baseCoord = new Coord(x, y);
                const wallCoord = this.getWallCoord(baseCoord);
                maze[wallCoord.y][wallCoord.x] = Cell.Wall;
            }
        }
        return maze;
    }

    /**
     * 棒倒し法のルールに従って、壁を作る座標を取得する
     * setupBaseで作成した壁の隣の座標のいずれかを壁にする
     *   2行目は、basePosの4方向（上下左右）隣の座標を返す
     *   2行目以降は、basePosの3方向（下左右）隣の座標を返す
     * @param baseCoord setupBaseで作成した壁
     * @returns 壁を作る座標
     */
    private getWallCoord(baseCoord: Coord): Coord {
        const diffs: Phaser.Math.Vector2[] =
            baseCoord.y === 2 ? this.directionDiffService.getDiff() : this.directionDiffService.getDiffWithoutUp();
        const diff: Phaser.Math.Vector2 = diffs[Math.floor(Math.random() * diffs.length)];
        return baseCoord.addPos(diff);
    }
}
