import Phaser from 'phaser';
import { PlayScene } from './presentation/scene/play/playScene';
import { TitleScene } from './presentation/scene/title/titleScene';
import { NavigateScene } from './presentation/scene/navigate/navigateScene';

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
    scene: [TitleScene, PlayScene, NavigateScene],
};

new Phaser.Game(config); // eslint-disable-line no-new
