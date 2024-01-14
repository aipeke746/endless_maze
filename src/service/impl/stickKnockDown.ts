import { Param } from '../../param';
import { CellType } from '../../type/cellType';

/**
 * 棒倒し法
 */
export class StickKnockDown {
    public create(): CellType[][] {
        return this.stickKnockDown(this.init());
        // return this.init();
    }

    private init(): CellType[][] {
        const field: CellType[][] = [];
        for (let y = 0; y < Param.MAZE_SIZE; y++) {
            field[y] = [];
            for (let x = 0; x < Param.MAZE_SIZE; x++) {
                field[y][x] = CellType.FLOOR;

                if (
                    x === 0 ||
                    x === Param.MAZE_SIZE - 1 ||
                    y === 0 ||
                    y === Param.MAZE_SIZE - 1
                ) {
                    field[y][x] = CellType.WALL;
                }
                if (x % 2 === 0 && y % 2 === 0) {
                    field[y][x] = CellType.WALL;
                }
            }
        }
        return field;
    }

    private stickKnockDown(field: CellType[][]): CellType[][] {
        for (let y = 2; y < Param.MAZE_SIZE - 1; y += 2) {
            for (let x = 2; x < Param.MAZE_SIZE - 1; x += 2) {
                const directions = [
                    { x: 1, y: 0 },
                    { x: 0, y: 1 },
                    { x: -1, y: 0 },
                ];
                if (y === 2) {
                    directions.push({ x: 0, y: -1 });
                }
                while (true) {
                    const dir =
                        directions[
                            Math.floor(Math.random() * directions.length)
                        ];
                    const tx = x + dir.x;
                    const ty = y + dir.y;

                    if (
                        tx >= 0 &&
                        tx < Param.MAZE_SIZE &&
                        ty >= 0 &&
                        ty < Param.MAZE_SIZE
                    ) {
                        field[ty][tx] = CellType.WALL;
                        break;
                    }
                }
            }
        }
        return field;
    }
}
