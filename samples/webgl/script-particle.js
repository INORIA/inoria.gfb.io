import * as PIXI from 'pixi.js'
import 'pixi-particles'

import circlesConfig from './json/circles.json'
import bubbleConfig from './json/bubble.json'
import gasConfig from './json/gas.json';

import bubble from './images/Bubbles99px.png'
import particle from './images/particle.png'
import smoke from './images/smokeparticle.png'
import circleFill from './images/circle.png'
import circleStroke from './images/circle-in.png'

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
    bubbleConfig
)

const gasEmitter = new PIXI.particles.Emitter(
    container,
    [PIXI.Texture.fromImage(particle), PIXI.Texture.fromImage(smoke)],
    gasConfig
)

const circlesEmitter = new PIXI.particles.Emitter(
    container,
    [PIXI.Texture.fromImage(circleFill), PIXI.Texture.fromImage(circleStroke)],
    circlesConfig
)

let elapsed = Date.now()

emitter.emit = false
circlesEmitter.emit = false
gasEmitter.emit = true

const update = () => {
    requestAnimationFrame(update)

    const mouseposition = app.renderer.plugins.interaction.mouse.global
    const now = Date.now()

    emitter.updateSpawnPos(mouseposition.x, mouseposition.y)
    emitter.update((now - elapsed) * 0.001)    

    gasEmitter.updateSpawnPos(mouseposition.x, mouseposition.y)
    gasEmitter.update((now - elapsed) * 0.001)

    circlesEmitter.updateSpawnPos(mouseposition.x, mouseposition.y)
    circlesEmitter.update((now - elapsed) * 0.001)

    elapsed = now

    app.renderer.render(container)
}

update()

app.view.addEventListener('mousedown', () => {
    emitter.emit = true
    circlesEmitter.emit = true
})
app.view.addEventListener('mouseup', () => {
    emitter.emit = false
    circlesEmitter.emit = false
})

// remove existing canvas to avoid duplication
const existing = document.querySelector('.app')
existing && existing.remove()

app.view.classList.add('app')
document.body.appendChild(app.view)
