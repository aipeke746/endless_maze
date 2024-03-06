import { MoveDirection } from '../../direction/moveDirection';
import { Sprite } from '../../sprite/sprite';
import { Animation } from '../animation';

/**
 * キャラクターのアニメーション
 */
export class CharacterAnimation extends Animation {
    /**
     * アニメーションの設定
     */
    protected readonly ANIMATION: Array<{
        key: MoveDirection;
        frameStart: number;
        frameEnd: number;
    }> = [
        { key: MoveDirection.DOWN, frameStart: 0, frameEnd: 2 },
        { key: MoveDirection.LEFT, frameStart: 5, frameEnd: 3 },
        { key: MoveDirection.RIGHT, frameStart: 6, frameEnd: 8 },
        { key: MoveDirection.UP, frameStart: 9, frameEnd: 11 },
    ];

    constructor(scene: Phaser.Scene, sprite: Sprite, spriteName: string) {
        super(scene, sprite, spriteName);
        this.create();
    }
}
