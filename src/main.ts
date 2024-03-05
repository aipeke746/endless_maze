import Phaser from 'phaser';
import { PlayScene } from './presentation/scene/playScene';
import { MenuScene } from './presentation/scene/menuScene';
import { ParameterScene } from './presentation/scene/parameterScene';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 600,
    height: 800,
    parent: 'app',
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: { y: 200 },
        },
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [MenuScene, PlayScene, ParameterScene],
};

new Phaser.Game(config); // eslint-disable-line no-new
