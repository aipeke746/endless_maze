import { AutoImpl } from '../../service/operate/impl/autoImpl';
import { ManualImpl } from '../../service/operate/impl/manualImpl';
import { OperateService } from '../../service/operate/operateService';
import { Operation } from './operation';

/**
 * 操作方法の種類から操作方法のサービスクラスを取得するファクトリクラス
 */
export class OperateFactory {
    /**
     * 操作方法の種類と操作方法のサービスクラスのマップ
     */
    private readonly MAP = new Map<Operation, OperateService>();

    /**
     * 操作方法の種類と操作方法のサービスクラスのマップを設定する
     */
    constructor(scene: Phaser.Scene) {
        this.MAP.set(Operation.MANUAL, new ManualImpl(scene));
        this.MAP.set(Operation.AUTO, new AutoImpl());
    }

    /**
     * 操作方法のサービスクラスを作成する
     * @param type 操作方法の種類
     * @returns 操作方法のサービスクラス
     */
    public create(type: Operation): OperateService {
        return this.MAP.get(type);
    }
}
