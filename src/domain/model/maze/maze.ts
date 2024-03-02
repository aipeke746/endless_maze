import { Cell } from '../cell/cell';

/**
 * 迷路自動生成
 */
export interface Maze {
    /**
     * 迷路を生成する
     */
    create: () => Cell[][];
}
