import { MoveDirectionType } from '../../type/MoveDirectionType';

/**
 * キャラクターの操作を行うサービス
 */
export interface OperateService {
    /**
     * キャラクターの移動方向を返す
     * @returns キャラクターの移動方向
     */
    getDirection: () => MoveDirectionType;
}
