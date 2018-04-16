import * as PIXI from 'pixi.js';
import logoImage from './logo.png';

let app = new PIXI.Application({
    width: 256, 
    height: 256,
    antialias: true,
    transparent: false,
    resolution: 1
})

const setup = () => {
    const logo = new PIXI.Sprite(
        PIXI.loader.resources[logoImage].texture
    )

    app.stage.addChild(logo);
}

PIXI.loader
.add(logoImage)
.load(setup)

document.body.appendChild(app.view);