/**
 * アニメーションのサービスクラス
 *
 * スプライトのアニメーションを生成する場合はこのクラスを継承して、クラスを作成する
 */
export abstract class Animation {
    /**
     * アニメーションの設定
     */
    protected abstract ANIMATION: Array<{
        key: string;
        frameStart: number;
        frameEnd: number;
    }>;

    /**
     * アニメーションを生成する
     * 継承したクラスのコンストラクタで呼び出す
     * @param scene シーン
     * @param spriteName スプライト名
     */
    protected create(scene: Phaser.Scene, spriteName: string): void {
        for (const anim of this.ANIMATION) {
            if (!scene.anims.exists(anim.key)) {
                scene.anims.create(this.config(scene, anim, spriteName));
            }
        }
    }

    /**
     * アニメーションを再生する
     * @param sprite アニメーションを再生するスプライト
     * @param key 再生するアニメーションのキー
     */
    public play(sprite: Phaser.GameObjects.Sprite, key: string): void {
        sprite.anims.play(key);
    }

    /**
     * アニメーションを停止する
     * @param sprite アニメーションを停止するスプライト
     */
    public stop(sprite: Phaser.GameObjects.Sprite): void {
        sprite.anims.stop();
    }

    /**
     * アニメーションの設定を返す
     * @param scene シーン
     * @param config アニメーションの設定
     * @param spriteName スプライト名
     * @returns アニメーションの設定
     */
    private config(
        scene: Phaser.Scene,
        config: { key: string; frameStart: number; frameEnd: number },
        spriteName: string
    ): Phaser.Types.Animations.Animation {
        return {
            key: config.key,
            frames: scene.anims.generateFrameNumbers(spriteName, {
                start: config.frameStart,
                end: config.frameEnd,
            }),
            frameRate: 10,
            repeat: -1,
        };
    }
}
