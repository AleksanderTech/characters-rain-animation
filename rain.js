export function Rain(userOptions) {
    let options = new Options();
    if (userOptions) {
        options.setOptions(userOptions);
    }
    // ------------------------setup----------------------
    let chainY = (window.innerHeight * -1);
    let font = options.fontSize + 'px ' + options.fontFamily;
    let firstCharColor = lighten(options.fontColor);
    let canvas = document.getElementById(options.canvasId);
    canvas.style.zIndex=-1;
    canvas.style.position='fixed';
    canvas.style.top=0;
    canvas.style.left=0;
    let ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let columnsNumber = Math.round(canvas.width / options.fontSize);
    let matrix = new Matrix(canvas, ctx);
    let chains = createChainArray(columnsNumber);
    let drawer = new Drawer(matrix, chains);
    let animation;
    let pause = false;

    document.body.addEventListener('keypress', toggleMatrix);

    
    

    this.start = function () {
        if (matrixState()) {
            chains = JSON.parse(sessionStorage.getItem('chains'));
            drawer = new Drawer(matrix, chains);
            animation = setInterval(render, options.interval, drawer, matrix);
            return;
        }
        animation = setInterval(render, options.interval, drawer, matrix);
    }
    // ------------------------setup----------------------
    // ------------------------util-----------------------
    function matrixState() {
        if (sessionStorage.getItem('chains')) {
            return true;
        }
        return false;
    }

    function toggleMatrix() {
        if (pause) {
            animation = setInterval(render, options.interval, drawer, matrix);
            pause = false;
        } else {
            sessionStorage.clear();
            sessionStorage.setItem('chains', JSON.stringify(chains));
            clearInterval(animation);
            pause = true;
        }
    }

    function randomNumber(from, to) {
        return Math.ceil(Math.random() * (to - from) + from - 1);
    }

    function randomFloat(from, to) {
        return Math.random() * (to - from) + from;
    }

    function lighten(hsla) {
        let firstIndex, lastIndex;
        firstIndex = hsla.indexOf('%');
        lastIndex = hsla.lastIndexOf('%');
        let prefix, suffix;
        prefix = hsla.substring(0, firstIndex + 2);
        suffix = hsla.substring(lastIndex);
        let light = parseInt(hsla.substring(firstIndex + 2, lastIndex));
        light = light + options.firstCharLighterBy;
        return prefix + light + suffix;
    }

    function colorWithOpacity(opacity) {
        let lastIndex = options.fontColor.lastIndexOf('%');
        let prefix = options.fontColor.substring(0, lastIndex + 2);
        return prefix + opacity + ')';
    }

    function randomCharacter() {
        return new Character(options.characters.charAt(randomNumber(0, options.characters.length)), randomNumber(options.minimumCharChangeResistance, options.maximumCharChangeResistance));
    }

    function randomSpeed() {
        return randomFloat((options.minimumSpeed) + options.fontSize, (options.maximumSpeed) + options.fontSize);
    }
    // ------------------------util-----------------------
    function createChainArray(size) {
        let chainArray = [];
        let x = 0;
        for (let i = 0; i < size; i++) {
            if ((i % options.columnsGap) == 0) {
                x = (i + 1) * options.fontSize;
                let chain = new Chain(createCharacterArray(randomNumber(options.minimumChainLength, options.maximumChainLength)), x, options.delay, randomSpeed());
                setCharactersOpacity(chain);
                chainArray.push(chain);
            }
        }
        return chainArray;
    }

    function setCharactersOpacity(chain) {
        let opacityFraction = options.fadeRange / chain.characters.length;
        let characterOpacity = 1;
        for (let j = chain.characters.length - 1; j >= 0; j--) {
            characterOpacity = characterOpacity - opacityFraction;
            if (Math.sign(characterOpacity) == 1) {
                chain.characters[j].opacity = characterOpacity;
            }
        }
    }

    function createCharacterArray(size) {
        let symbolArray = [];
        for (let i = 0; i < size; i++) {
            symbolArray.push(randomCharacter());
        }
        return symbolArray;
    }

    function render(drawer, matrix) {
        matrix.ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = options.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        matrix.ctx.font = font;
        drawer.drawChains();
    }
    // ----------------------classes----------------------
    function Options() {
        this.characters = `1234567890㐀㐁㐂㐃㐄㐅㐆㐇㐈㐉㐊㐋㐌㐍㐎`;
        this.fontSize = 22;
        this.delay = -1000;
        this.minimumSpeed = 1;
        this.maximumSpeed = 5;
        this.minimumChainLength = 10;
        this.maximumChainLength = 22;
        this.canvasId = 'canvas';
        this.interval = 35;
        this.fontFamily = 'monospace';
        this.fontColor = 'hsla(120, 87%, 53%, 1)';
        this.fadeRange = 0.7;
        this.chainChangeResistance = 8;
        this.minimumCharChangeResistance = 50;
        this.maximumCharChangeResistance = 100;
        this.columnsGap = 2;
        this.backgroundColor = 'hsla(0, 0%, 0%, 1)';
        this.firstCharLighterBy = 25;
        this.setOptions = function (options) {
            if (!!options.characters) {
                this.characters = options.characters;
            } if (!!options.fontSize) {
                this.fontSize = options.fontSize;
            } if (!!options.delay) {
                this.delay = options.delay;
            } if (!!options.minimumSpeed) {
                this.minimumSpeed = options.minimumSpeed;
            } if (!!options.maximumSpeed) {
                this.maximumSpeed = options.maximumSpeed;
            } if (!!options.minimumChainLength) {
                this.minimumChainLength = options.minimumChainLength;
            } if (!!options.maximumChainLength) {
                this.maximumChainLength = options.maximumChainLength;
            } if (!!options.canvasId) {
                this.canvasId = options.canvasId;
            } if (!!options.interval) {
                this.interval = options.interval;
            } if (!!options.fontFamily) {
                this.fontFamily = options.fontFamily;
            } if (!!options.fontColor) {
                this.fontColor = options.fontColor;
            } if (!!options.fadeRange) {
                this.fadeRange = options.fadeRange;
            } if (!!options.chainChangeResistance) {
                this.chainChangeResistance = options.chainChangeResistance;
            } if (!!options.minimumCharChangeResistance) {
                this.minimumCharChangeResistance = options.minimumCharChangeResistance;
            } if (!!options.columnsGap) {
                this.columnsGap = options.columnsGap;
            } if (!!options.backgroundColor) {
                this.backgroundColor = options.backgroundColor;
            } if (!!options.firstCharLighterBy) {
                this.firstCharLighterBy = options.firstCharLighterBy;
            }
            return this;
        }
        return this;
    }

    function Matrix(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    function Chain(characters, x, y, speed) {
        this.characters = characters;
        this.x = x;
        this.y = y;
        this.length = options.fontSize * this.characters.length;
        this.speed = speed;
    }

    function Character(value, changeResistance) {
        this.value = value;;
        this.opacity;
        this.changeResistance = changeResistance;
    }

    function Drawer(matrix, chains) {
        this.matrix = matrix;
        this.chains = chains;
        this.drawChains = function () {
            for (let i = 0; i < chains.length; i++) {
                this.drawCharacters(chains[i]);
            }
        };
        this.randomizeCharacter = function (character) {

            if (parseInt((performance.now() % (options.chainChangeResistance + character.changeResistance))) == 0) {
                character.value = randomCharacter().value;
                return true;
            }
        };
        this.drawCharacters = function (chain) {
            ctx.fillStyle = options.fontColor;
            for (let i = 0; i < chain.characters.length; i++) {
                let character = chain.characters[i];
                ctx.fillStyle = colorWithOpacity(character.opacity);
                if (i == chain.characters.length - 1) {
                    ctx.fillStyle = firstCharColor;
                }
                matrix.ctx.fillText(character.value, chain.x, chain.y);
                chain.y = chain.y + options.fontSize;
                this.randomizeCharacter(character);
            }
            this.updateChainCoordinates(chain);
        };
        this.updateChainCoordinates = function (chain) {
            chain.y = (chain.y - chain.length) + chain.speed - options.fontSize;
            if (chain.y >= matrix.canvas.height) {
                chain.y = chainY;
                chain.speed = randomSpeed();
            }
        };
    }
    // ----------------------classes----------------------
}