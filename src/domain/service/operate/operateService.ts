import { MapState } from '../../model/map/mapState';
import { MoveDirection } from '../../model/direction/MoveDirection';
import { Coord } from '../../model/coord/coord';

/**
 * キャラクターの操作を行うサービス
 */
export interface OperateService {
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