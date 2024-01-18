import { MoveDirectionType } from '../type/MoveDirectionType';

/**
 * キャラクターのアニメーション
 */
export class CharacterAnimation {
    /**
     * アニメーションの設定
     */
    private static readonly ANIMATION: Array<{
        key: MoveDirectionType;
        frameStart: number;
        frameEnd: number;
    }> = [
        { key: MoveDirectionType.DOWN, frameStart: 0, frameEnd: 2 },
        { key: MoveDirectionType.LEFT, frameStart: 3, frameEnd: 5 },
        { key: MoveDirectionType.RIGHT, frameStart: 6, frameEnd: 8 },
        { key: MoveDirectionType.UP, frameStart: 9, frameEnd: 11 },
    ];

    /**
     * アニメーションを生成する
     * @param scene シーン
     * @param spriteName スプライト名
     */
    public static create(scene: Phaser.Scene, spriteName: string): void {
        for (const anim of CharacterAnimation.ANIMATION) {
            if (!scene.anims.exists(anim.key)) {
                scene.anims.create(this.config(scene, anim, spriteName));
            }
        }
    }

    /**
     * アニメーションの設定を返す
     * @param scene シーン
     * @param config アニメーションの設定
     * @param spriteName スプライト名
     * @returns アニメーションの設定
     */
    private static config(
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
