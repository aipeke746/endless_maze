import { AutoImpl } from '../../service/operate/impl/autoImpl';
import { ManualImpl } from '../../service/operate/impl/manualImpl';
import { OperateService } from '../../service/operate/operateService';
import { OperateType } from './operateType';

/**
 * 操作方法の種類から操作方法のサービスクラスを取得するファクトリクラス
 */
export class OperateFactory {
    /**
     * 操作方法の種類と操作方法のサービスクラスのマップ
     */
    private readonly MAP = new Map<OperateType, OperateService>();

    /**
     * 操作方法の種類と操作方法のサービスクラスのマップを設定する
     */
    constructor(scene: Phaser.Scene) {
        this.MAP.set(OperateType.MANUAL, new ManualImpl(scene));
        this.MAP.set(OperateType.AUTO, new AutoImpl());
    }

    /**
     * 操作方法のサービスクラスを作成する
     * @param type 操作方法の種類
     * @returns 操作方法のサービスクラス
     */
    public create(type: OperateType): OperateService {
        return this.MAP.get(type);
    }
}
