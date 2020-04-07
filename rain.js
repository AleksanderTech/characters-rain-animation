export function Rain(userOptions) {

    let chainY = (window.innerHeight * -1);
    let font;
    let firstCharColor;

    this.start = function () {
        let options = new Options();
        if(userOptions){
            options.setOptions(userOptions);
        }
        let tools = new Tools(options);
        let chainFactory = new ChainFactory(options, tools);
        font = options.fontSize + 'px ' + options.fontFamily;
        firstCharColor = tools.lighten(options.fontColor);
        let canvas = document.getElementById(options.canvasId);
        let ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let columnsNumber = Math.round(canvas.width / options.fontSize);
        let matrix = new Matrix(canvas, ctx);
        let chains = chainFactory.createChainArray(columnsNumber);
        let drawer = new Drawer(matrix, chains, options, tools);
        let animation;
        animation = setInterval(render, options.interval, drawer);
    };

    function render(drawer) {
        drawer.matrix.ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawer.matrix.ctx.fillStyle = drawer.options.backgroundColor;
        drawer.matrix.ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawer.matrix.ctx.font = font;
        drawer.drawChains();
    };

    function ChainFactory(options, tools) {
        this.options = options;
        this.tools = tools;
        this.createChainArray = function (size) {
            let chainArray = [];
            let x = 0;
            for (let i = 0; i < size; i++) {
                if ((i % options.columnsGap) == 0) {
                    x = (i + 1) * options.fontSize;
                    let chain = new Chain(
                        createCharacterArray(this.tools.randomNumber(this.options.minimumChainLength, this.options.maximumChainLength)),
                        x, this.options.delay, this.tools.randomSpeed(),this.options.fontSize);
                    setCharactersOpacity(chain);
                    chainArray.push(chain);
                }
            }
            return chainArray;
        };
        function createCharacterArray(size) {
            let symbolArray = [];
            for (let i = 0; i < size; i++) {
                symbolArray.push(tools.randomCharacter());
            }
            return symbolArray;
        };
        function setCharactersOpacity(chain) {
            let opacityFraction = options.fadeRange / chain.characters.length;
            let characterOpacity = 1;
            for (let j = chain.characters.length - 1; j >= 0; j--) {
                characterOpacity = characterOpacity - opacityFraction;
                if (Math.sign(characterOpacity) == 1) {
                    chain.characters[j].opacity = characterOpacity;
                }
            }
        };
    }

    function Tools(options) {
        this.options = options;
        this.randomNumber = function (from, to) {
            return Math.ceil(Math.random() * (to - from) + from - 1);
        };
        this.randomFloat = function (from, to) {
            return Math.random() * (to - from) + from;
        };
        this.lighten = function (hsla) {
            let firstIndex, lastIndex;
            firstIndex = hsla.indexOf('%');
            lastIndex = hsla.lastIndexOf('%');
            let prefix, suffix;
            prefix = hsla.substring(0, firstIndex + 2);
            suffix = hsla.substring(lastIndex);
            let light = parseInt(hsla.substring(firstIndex + 2, lastIndex));
            light = light + this.options.firstCharLighterBy;
            return prefix + light + suffix;
        };
        this.colorWithOpacity = function (opacity) {
            let lastIndex = this.options.fontColor.lastIndexOf('%');
            let prefix = this.options.fontColor.substring(0, lastIndex + 2);
            return prefix + opacity + ')';
        };
        this.randomCharacter = function () {
            return new Character(this.options.characters.charAt(this.randomNumber(0, this.options.characters.length)), this.randomNumber(options.minimumCharChangeResistance, options.maximumCharChangeResistance));
        };
        this.randomSpeed = function () {
            return this.randomFloat((this.options.minimumSpeed) + this.options.fontSize, (this.options.maximumSpeed) + this.options.fontSize);
        }
    }

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

    function Chain(characters, x, y, speed, fontSize) {
        this.characters = characters;
        this.x = x;
        this.y = y;
        this.length = fontSize * this.characters.length;
        this.speed = speed;
    }

    function Character(value, changeResistance) {
        this.value = value;;
        this.opacity;
        this.changeResistance = changeResistance;
    }

    function Drawer(matrix, chains, options, tools) {
        this.matrix = matrix;
        this.chains = chains;
        this.options = options;
        this.tools = tools;
        this.drawChains = function () {
            for (let i = 0; i < chains.length; i++) {
                this.drawCharacters(chains[i]);
            }
        };
        this.drawCharacters = function(chain) {
            this.matrix.ctx.fillStyle = this.options.fontColor;
            for (let i = 0; i < chain.characters.length; i++) {
                let character = chain.characters[i];
                this.matrix.ctx.fillStyle = this.tools.colorWithOpacity(character.opacity);
                if (i == chain.characters.length - 1) {
                    this.matrix.ctx.fillStyle = firstCharColor;
                }
                this.matrix.ctx.fillText(character.value, chain.x, chain.y);
                chain.y = chain.y +this.options.fontSize;
                this.randomizeCharacter(character);
            }
            this.updateChainCoordinates(chain);
        };
        this.randomizeCharacter = function(character) {
            if ((performance.now() % (this.options.chainChangeResistance + character.changeResistance)) == 0) {
                character.value = this.tools.randomCharacter().value;
                return true;
            }
        };
        this.updateChainCoordinates = function(chain) {
            chain.y = (chain.y - chain.length) + chain.speed - this.options.fontSize;
            if (chain.y >= this.matrix.canvas.height) {
                chain.y = chainY;
                chain.speed = this.tools.randomSpeed();
            }
        };
    }
}
