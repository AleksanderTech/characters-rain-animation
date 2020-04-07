import { Rain } from '/rain.js';

(function App() {
    let options = {
        characters: `01`,
        fontSize: 22,
        delay: -1000,
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
})();

