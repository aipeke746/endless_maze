import { StickDirection } from '../../direction/stickDirection';
import { Sprite } from '../../sprite/sprite';
import { Animation } from '../animation';

export class StickAnimation extends Animation {
    protected readonly ANIMATION: Array<{
        key: StickDirection;
        frameStart: number;
        frameEnd: number;
    }> = [
        { key: StickDirection.Down, frameStart: 0, frameEnd: 0 },
        { key: StickDirection.Up, frameStart: 1, frameEnd: 1 },
        { key: StickDirection.Left, frameStart: 2, frameEnd: 2 },
        { key: StickDirection.Right, frameStart: 3, frameEnd: 3 },
        { key: StickDirection.Idle, frameStart: 4, frameEnd: 4 },
    ];

    constructor(scene: Phaser.Scene, sprite: Sprite, spriteName: string) {
        super(scene, sprite, spriteName);
        this.create();
    }
}
