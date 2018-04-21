import * as PIXI from 'pixi.js'
import 'pixi-particles'

import bubble from './images/Bubbles99px.png';
import particle from './images/particle.png';
import smoke from './images/smokeparticle.png';

let app = new PIXI.Application({
    width: window.innerWidth, 
    height: window.innerHeight,
    antialias: true,
    autoResize: true,
    transparent: false,
    resolution: 1
})

const container = new PIXI.Container()

const emitter = new PIXI.particles.Emitter(
    container,
    [PIXI.Texture.fromImage(bubble)],
    {
        "alpha": {
            "start": 1,
            "end": 1
        },
        "scale": {
            "start": 3,
            "end": 0.01,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#e4f9ff",
            "end": "#3fcbff"
        },
        "speed": {
            "start": 600,
            "end": 50,
            "minimumSpeedMultiplier": 1
        },
        "acceleration": {
            "x": 1,
            "y": 0
        },
        "maxSpeed": 0,
        "startRotation": {
            "min": 0,
            "max": 360
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 0,
            "max": 0
        },
        "lifetime": {
            "min": 0.2,
            "max": 0.8
        },
        "blendMode": "normal",
        "frequency": 0.001,
        "emitterLifetime": -1,
        "maxParticles": 300,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": true,
        "spawnType": "circle",
        "spawnCircle": {
            "x": 0,
            "y": 0,
            "r": 0
        }
    }
)

let gasEmitter = new PIXI.particles.Emitter(
    container,
    [PIXI.Texture.fromImage(particle), PIXI.Texture.fromImage(smoke)],
    {
        "alpha": {
            "start": 0.4,
            "end": 0
        },
        "scale": {
            "start": 2,
            "end": 0.4,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#6bff61",
            "end": "#d8ff4a"
        },
        "speed": {
            "start": 10,
            "end": 10,
            "minimumSpeedMultiplier": 1
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "maxSpeed": 0,
        "startRotation": {
            "min": 0,
            "max": 360
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 0,
            "max": 0
        },
        "lifetime": {
            "min": 2,
            "max": 1.8
        },
        "blendMode": "screen",
        "frequency": 0.01,
        "emitterLifetime": -1,
        "maxParticles": 1000,
        "pos": {
            "x": 0.5,
            "y": 0.5
        },
        "addAtBack": true,
        "spawnType": "circle",
        "spawnCircle": {
            "x": 0,
            "y": 0,
            "r": 150
        }
    }
)

let elapsed = Date.now()

emitter.emit = true

const update = () => {
    requestAnimationFrame(update);

    const mouseposition = app.renderer.plugins.interaction.mouse.global
    const now = Date.now()

    emitter.updateSpawnPos(mouseposition.x, mouseposition.y)
    emitter.update((now - elapsed) * 0.001);

    gasEmitter.updateSpawnPos(mouseposition.x, mouseposition.y)
    gasEmitter.update((now - elapsed) * 0.001)    

    elapsed = now

    app.renderer.render(container)
}

update()

document.body.appendChild(app.view)