
const ref = {
    start: document.querySelector('button[data-start]'),
    stop: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function ubdateBgc() {
    ref.body.style.backgroundColor = getRandomHexColor();
}

class ChangeColor {

    constructor({ updateColor}) {
        this.timerId = null;
        this.updateColor = updateColor;
        this.init()
    }

    init() {
        ref.stop.setAttribute('disabled', 'disabled');
    }

    start() {
        ref.start.setAttribute('disabled', 'disabled');
        ref.stop.removeAttribute('disabled');

        this.timerId = setInterval(() => {
            this.updateColor()
        }, 1000);
    }

    stop() {
        clearInterval(this.timerId);
        ref.start.removeAttribute('disabled');
        this.init()
    }
};

const changeColor = new ChangeColor({
    updateColor: ubdateBgc,
});

ref.start.addEventListener('click', changeColor.start.bind(changeColor));
ref.stop.addEventListener('click', changeColor.stop.bind(changeColor));



