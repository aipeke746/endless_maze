/**
 * 操作方法の種類
 */
export const OPERATION = {
    /**
     * 手動
     * （矢印キー入力・スワイプ入力によって移動する）
     */
    MANUAL: 'manual',
    /**
     * 自動
     * （幅優先探索法を使用して目的の座標に向かって移動する）
     */
    AUTO: 'auto',
};

export type Operation = (typeof OPERATION)[keyof typeof OPERATION];
