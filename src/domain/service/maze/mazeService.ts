import { Cell } from '../../model/cell/cell';

/**
 * 迷路自動生成
 */
export interface MazeService {
    /**
     * 迷路を生成する
     */
    create: () => Cell[][];
}
