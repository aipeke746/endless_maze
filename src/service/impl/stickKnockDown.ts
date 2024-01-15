import { Param } from '../../param';
import { CellType } from '../../type/cellType';
import { DirectionUtil } from '../../util/directionUtil';
import { MazeService } from '../mazeService';

/**
 * 迷路自動生成: 棒倒し法
 */
export class StickKnockDown implements MazeService {
    /**
     * 棒倒し法で迷路を生成する
     * @returns 迷路を生成する
     */
    public create(): CellType[][] {
        return this.stickKnockDown(this.setupBase());
    }

    /**
     * 迷路の土台を作成する（外周と偶数行・列を壁にする）
     * @returns 迷路の土台
     */
    private setupBase(): CellType[][] {
        const base: CellType[][] = [];
        for (let y = 0; y < Param.MAZE_SIZE; y++) {
            base[y] = [];
            for (let x = 0; x < Param.MAZE_SIZE; x++) {
                base[y][x] = CellType.FLOOR;

                if (
                    x === 0 ||
                    x === Param.MAZE_SIZE - 1 ||
                    y === 0 ||
                    y === Param.MAZE_SIZE - 1
                ) {
                    base[y][x] = CellType.WALL;
                }
                if (x % 2 === 0 && y % 2 === 0) {
                    base[y][x] = CellType.WALL;
                }
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
    private stickKnockDown(base: CellType[][]): CellType[][] {
        const maze = JSON.parse(JSON.stringify(base));

        for (let y = 2; y < Param.MAZE_SIZE - 1; y += 2) {
            for (let x = 2; x < Param.MAZE_SIZE - 1; x += 2) {
                const basePos = new Phaser.Math.Vector2(x, y);
                const pos = this.getChangeWallPosByKnockDown(basePos, y !== 2);
                maze[pos.y][pos.x] = CellType.WALL;
            }
        }
        return maze;
    }

    /**
     * 棒倒し法のルールに従って、壁を作る座標を取得する
     * setupBaseで作成した壁の隣の座標のいずれかを壁にする
     * @param basePos setupBaseで作成した壁
     * @param withoutUp 2行目以降は上方向に壁を作らない
     * @returns 壁を作る座標
     */
    private getChangeWallPosByKnockDown(
        basePos: Phaser.Math.Vector2,
        withoutUp: boolean
    ): Phaser.Math.Vector2 {
        const changeWallPos = this.canChangeWallPosByKnockDown(
            basePos,
            withoutUp
        );
        return changeWallPos[Math.floor(Math.random() * changeWallPos.length)];
    }

    /**
     * 棒倒し法のルールに従って、壁を作ることができる座標座標を取得する
     *   2行目は、basePosの4方向（上下左右）隣の座標を返す
     *   2行目以降は、basePosの3方向（下左右）隣の座標を返す
     * @param basePos setupBaseで作成した壁
     * @param withoutUp 2行目以降は上方向に壁を作らない
     * @returns 壁を作ることができる全ての座標
     */
    private canChangeWallPosByKnockDown(
        basePos: Phaser.Math.Vector2,
        withoutUp: boolean
    ): Phaser.Math.Vector2[] {
        const result: Phaser.Math.Vector2[] = [];
        const direction = withoutUp
            ? DirectionUtil.DIFF_WITHOUT_UP
            : DirectionUtil.DIFF;

        for (const dir of direction) {
            const next = basePos.clone().add(dir);
            if (
                next.x >= 0 &&
                next.x < Param.MAZE_SIZE &&
                next.y >= 0 &&
                next.y < Param.MAZE_SIZE
            ) {
                result.push(next);
            }
        }
        return result;
    }
}
