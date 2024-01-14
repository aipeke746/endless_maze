import { StickKnockDown } from '../../service/impl/stickKnockDown';
import { CellType } from '../../type/cellType';

export class MapState {
    public static readonly SIZE = 64;
    private readonly field: CellType[][] = [];

    constructor() {
        const service = new StickKnockDown();
        this.field = service.create();
    }

    public getField(): CellType[][] {
        return this.field;
    }
}
