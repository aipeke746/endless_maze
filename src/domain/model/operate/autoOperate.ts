import { MoveDirection } from '../direction/moveDirection';
import { MoveDirectionDiff } from '../direction/moveDirectionDiff';
import { Coord } from '../coord/coord';
import { FifoQueue } from '../queue/fifoQueue';
import { Maze } from '../maze/maze';

/**
 * 自動操作の実装
 *
 * 幅優先探索方を用いて、移動元（from）から移動先（to）までの最短経路を求めて次に移動する方向を決定する
 */
export class AutoOperate {
    /**
     * 移動不可
     */
    private readonly CANNOT_MOVE = -1;
    /**
     * 移動可
     */
    private readonly CAN_MOVE = 0;
    /**
     * 幅優先探索法の開始カウンターの数字
     */
    private readonly START_COUNTER_NUM = 1;
    /**
     * 移動方向の差分に関するサービス
     */
    private readonly directionDiffService: MoveDirectionDiff = new MoveDirectionDiff();

    /**
     * 次の移動方向を返す
     * @param maze 迷路の状態
     * @param from 移動元の座標（現在地）
     * @param to 移動先の座標（目的地）
     * @returns 次の移動方向
     */
    getDirection(maze: Maze, from: Coord, to: Coord): MoveDirection {
        const dist = this.conversion(maze);
        const bfsDist = this.bfs(dist, from, to);
        return this.nextDirection(bfsDist, to);
    }

    /**
     * 迷路の状態から移動可能な座標と移動不可な座標に変換する
     * @param maze 迷路の状態
     * @param from 移動元の座標
     * @returns 移動可能な座標
     */
    private conversion(maze: Maze): number[][] {
        const dist: number[][] = [];
        for (let y = 0; y < Maze.SIZE; y++) {
            dist[y] = [];
            for (let x = 0; x < Maze.SIZE; x++) {
                dist[y][x] = maze.isFloor(new Coord(x, y)) ? this.CAN_MOVE : this.CANNOT_MOVE;
            }
        }
        return dist;
    }

    /**
     * 幅優先探索法（Breath First Search）を用いて、移動元（from）から移動先（to）までの最短経路を求める
     * 移動元の座標から順にカウントアップした数字を移動可能な座標に設定していく
     * @param dist_ 変換した迷路の状態（移動可能な座標と移動不可な座標に変換したもの）
     * @param from 移動元の座標（現在地）
     * @param to 移動先の座標（目的地）
     * @returns 移動元から移動先までの最短経路
     */
    private bfs(dist_: number[][], from: Coord, to: Coord): number[][] {
        const dist = JSON.parse(JSON.stringify(dist_));
        const queue = new FifoQueue<Coord>();

        queue.enqueue(from);
        dist[from.y][from.x] = this.START_COUNTER_NUM;

        // 幅優先探索法
        while (!queue.isEmpty()) {
            const coord = queue.dequeue();
            if (coord.x === to.x && coord.y === to.y) {
                break;
            }

            for (const diff of this.directionDiffService.getDiff()) {
                try {
                    const nextCoord = coord.addPos(diff);
                    if (dist[nextCoord.y][nextCoord.x] === this.CAN_MOVE) {
                        queue.enqueue(nextCoord);
                        dist[nextCoord.y][nextCoord.x] = dist[coord.y][coord.x] + 1;
                    }
                } catch (e) {
                    // 例外（座標がマップ[迷路のフィールド]外）の場合は処理をスキップする
                    continue;
                }
            }
        }
        return dist;
    }

    /**
     * 次の移動方向を返す
     * @param dist
     * @param to
     * @returns
     */
    private nextDirection(dist: number[][], to: Coord): MoveDirection {
        let nextDirection: MoveDirection = MoveDirection.IDLE;
        let coord = to;

        while (dist[coord.y][coord.x] > this.START_COUNTER_NUM) {
            for (const diff of this.directionDiffService.getDiff()) {
                try {
                    const nextCoord = coord.addPos(diff);
                    if (dist[nextCoord.y][nextCoord.x] === dist[coord.y][coord.x] - 1) {
                        nextDirection = this.directionDiffService.getOpponentDirection(diff);
                        coord = nextCoord;
                        break;
                    }
                } catch (e) {
                    // 例外（座標がマップ[迷路のフィールド]外）の場合は処理をスキップする
                    continue;
                }
            }
        }
        return nextDirection;
    }
}
