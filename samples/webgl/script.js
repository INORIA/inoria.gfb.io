import * as PIXI from 'pixi.js';

import logoImage from './logo.png';

let app = new PIXI.Application({
    width: window.innerWidth, 
    height: window.innerHeight,
    antialias: true,
    autoResize: true,
    transparent: false,
    resolution: 1
})

const setup = () => {
    const logo = new PIXI.Sprite(
        PIXI.loader.resources[logoImage].texture
    )

    const trailTexture = PIXI.Texture.fromImage(logoImage)
    trailTexture.rotate = 12
    const historyX = []
    const historyY = []
    const historySize = 20
    const ropeSize = 100
    const points = []

    for ( let i = 0; i < historySize; i++ ) {
        historyX.push(0)
        historyY.push(0)
    }

    for ( let i = 0; i < ropeSize; i++ ) {
        points.push(new PIXI.Point(0, 0))
    }

    const rope = new PIXI.mesh.Rope(trailTexture, points)
    rope.blendmode = PIXI.BLEND_MODES.ADD

    app.stage.addChild(rope)
    // app.stage.addChild(logo)

    app.ticker.add(delta => {
        const mousePosition = app.renderer.plugins.interaction.mouse.global;

        historyX.pop()
        historyX.unshift(mousePosition.x)
        historyY.pop()
        historyY.unshift(mousePosition.y)

        for ( let i = 0; i < ropeSize; i++ ) {
            const p = points[i]
            const ix = cubicInterpolation(historyX, i / ropeSize * historySize)
            const iy = cubicInterpolation(historyY, i / ropeSize * historySize)
            p.x = ix
            p.y = iy
        }
    })
}

window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight)
});

PIXI.loader
.add(logoImage)
.load(setup)

document.body.appendChild(app.view);

/**
 * Cubic interpolation based on https://github.com/osuushi/Smooth.js
 * @param	k
 * @return
 */
function clipInput(k, arr)
{
	if (k < 0)
		k = 0;
	if (k > arr.length - 1)
		k = arr.length - 1;
	return arr[k];
}

function getTangent(k, factor, array)
{
	return factor * (clipInput(k + 1, array) - clipInput(k - 1,array)) / 2;
}

function cubicInterpolation(array, t, tangentFactor)
{
	if (tangentFactor == null) tangentFactor = 1;
	
	var k = Math.floor(t);
	var m = [getTangent(k, tangentFactor, array), getTangent(k + 1, tangentFactor, array)];
	var p = [clipInput(k,array), clipInput(k+1,array)];
	t -= k;
	var t2 = t * t;
	var t3 = t * t2;
	return (2 * t3 - 3 * t2 + 1) * p[0] + (t3 - 2 * t2 + t) * m[0] + ( -2 * t3 + 3 * t2) * p[1] + (t3 - t2) * m[1];
}