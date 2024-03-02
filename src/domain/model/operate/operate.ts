import { MapState } from '../map/mapState';
import { MoveDirection } from '../direction/moveDirection';
import { Coord } from '../coord/coord';

/**
 * キャラクターの操作を行うサービス
 */
export interface Operate {
    /**
     * キャラクターの移動方向を返す
     * 手動操作の場合は、引数は不要
     * @param mapState マップの状態（自動操作の場合は必要）
     * @param from 移動元の座標（自動操作の場合は必要）
     * @param to 移動先の座標（自動操作の場合は必要）
     * @returns キャラクターの移動方向
     */
    getDirection: (mapState?: MapState, from?: Coord, to?: Coord) => MoveDirection;
}
