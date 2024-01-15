import Phaser from 'phaser';
import { PlayScene } from './scene/playScene';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 5800,
    height: 5600,
    parent: 'app',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
        },
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [PlayScene],
};

new Phaser.Game(config); // eslint-disable-line no-new
