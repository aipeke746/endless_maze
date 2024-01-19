import { Param } from '../../../param';
import { CellType } from '../../../type/cellType';
import { DirectionDiffUtil } from '../../../util/directionDiffUtil';
import { FieldUtil } from '../../../util/fieldUtil';
import { Coord } from '../../../vo/coord';
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
                const coord = new Coord(x, y);
                base[coord.y][coord.x] = CellType.FLOOR;

                if (this.isSetupWallCoord(coord)) {
                    base[y][x] = CellType.WALL;
                }
            }
        }
        return base;
    }

    /**
     * 指定した座標が壁をセットする座標かどうかを返す
     * @param coord 座標
     * @returns 壁をセットする座標の場合はtrue
     */
    private isSetupWallCoord(coord: Coord): boolean {
        return FieldUtil.isCircumference(coord) || this.isEven(coord);
    }

    /**
     * 指定した座標が偶数行・列かどうかを返す
     * @param coord 座標
     * @returns 偶数行・列の場合はtrue
     */
    private isEven(coord: Coord): boolean {
        return coord.x % 2 === 0 && coord.y % 2 === 0;
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
                const baseCoord = new Coord(x, y);
                const coord: Coord = this.getWallCoord(baseCoord, y !== 2);
                maze[coord.y][coord.x] = CellType.WALL;
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
     * @param withoutUp baseCoordから上方向に壁を作らない場合はtrue
     *                    2行目は、basePosの4方向（上下左右）隣の座標を返す
     *                    2行目以降は、basePosの3方向（下左右）隣の座標を返す
     * @returns 壁を作る座標
     */
    private getWallCoord(baseCoord: Coord, withoutUp: boolean): Coord {
        const directions = withoutUp
            ? DirectionDiffUtil.DIFF_WITHOUT_UP
            : DirectionDiffUtil.DIFF;
        const changeWallCoord = this.canChangeWallCoords(baseCoord, directions);
        return changeWallCoord[
            Math.floor(Math.random() * changeWallCoord.length)
        ];
    }

    /**
     * 棒倒し法のルールに従って、壁を作ることができる座標座標を取得する
     * @param baseCoord setupBaseで作成した壁の座標
     * @param directions baseCoordからの相対座標（壁を作る方向）
     * @returns 壁を作ることができる全ての座標
     */
    private canChangeWallCoords(
        baseCoord: Coord,
        directions: Phaser.Math.Vector2[]
    ): Coord[] {
        const result: Coord[] = [];

        for (const dir of directions) {
            try {
                const next = baseCoord.addPos(dir);
                result.push(next);
            } catch {
                // 例外（座標がマップ[迷路のフィールド]外）の場合は何もしない
            }
        }
        return result;
    }
}
