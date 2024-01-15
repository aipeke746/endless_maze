import { CellType } from '../type/cellType';

/**
 * 迷路自動生成
 */
export interface MazeService {
    /**
     * 迷路を生成する
     */
    create: () => CellType[][];
}
