import { AutoImpl } from './impl/autoImpl';
import { ManualImpl } from './impl/manualImpl';
import { Operate } from './operate';
import { Operation } from './operation';

/**
 * 操作方法の種類から操作方法のサービスクラスを取得するファクトリクラス
 */
export class OperateFactory {
    /**
     * 操作方法の種類と操作方法のサービスクラスのマップ
     */
    private readonly MAP = new Map<Operation, Operate>();

    /**
     * 操作方法の種類と操作方法のサービスクラスのマップを設定する
     */
    constructor(scene: Phaser.Scene) {
        this.MAP.set(Operation.MANUAL, new ManualImpl(scene));
        this.MAP.set(Operation.AUTO, new AutoImpl());
    }

    /**
     * 操作方法のサービスクラスを作成する
     * @param operation 操作方法の種類
     * @returns 操作方法のサービスクラス
     */
    public create(operation: Operation): Operate {
        return this.MAP.get(operation);
    }
}
