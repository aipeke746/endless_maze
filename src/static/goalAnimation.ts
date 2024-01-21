export class GoalAnimation {
    private static readonly ANIMATION: Array<{
        key: string;
        frameStart: number;
        frameEnd: number;
    }> = [{ key: 'goal', frameStart: 0, frameEnd: 19 }];

    public static create(scene: Phaser.Scene, spriteName: string): void {
        for (const anim of GoalAnimation.ANIMATION) {
            if (!scene.anims.exists(anim.key)) {
                scene.anims.create(this.config(scene, anim, spriteName));
            }
        }
    }

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
