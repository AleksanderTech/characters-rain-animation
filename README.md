# characters-rain-animation

Fully customisable matrix rain animation written in JavaScript. Code is self contained and ready for plug in into Your projects.

___

## usage 

* Download rain.js from repository
* Include `<canvas id="canvas"></canvas>` in html(id by default is set to 'canvas' but it can be easily changed)
* Add JS `new Rain().start();`
* (optional) To customise animation pass options that You'd like to change to Rain object:
 ```javascript
let options = {
        characters: `01`,
        fontSize: 22,
        delay: -700,
        minimumSpeed: 1,
        maximumSpeed: 5,
        minimumChainLength: 10,
        maximumChainLength: 22,
        canvasId: 'canvas',
        interval: 35,
        fontFamily: 'monospace',
        fontColor: 'hsla(120, 87%, 53%, 1)',
        fadeRange: 0.7,
        chainChangeResistance: 8,
        minimumCharChangeResistance: 50,
        maximumCharChangeResistance: 100,
        columnsGap: 2,
        backgroundColor: 'hsla(0, 0%, 0%, 1)',
        firstCharLighterBy: 25
    };
    let rain = new Rain(options);
    rain.start();
```

## examples

<img src="/images/blue-rain.png" width="400px"><img src="/images/purple-rain.png" width="400px">
<img src="/images/green-rain.png" width="400px"><img src="/images/red-rain.png" width="400px">
