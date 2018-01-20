class Shape {
    constructor() {
        this.isListening = false;
        this.started = false;
        this.x = 0;
        this.y = 0;
        this.r = 0;

        this.init = this.init.bind(this);
        this.draw = this.draw.bind(this);
        this.clean = this.clean.bind(this);
        this.mousedown = this.mousedown.bind(this);
        this.mousemove = this.mousemove.bind(this);
        this.mouseup = this.mouseup.bind(this);
    }

    init({ afterDraw }) {
        this.afterDraw = afterDraw;
    }

    draw() {
        if (!this.isListening) {
            canvas.observe('mouse:down', this.mousedown);
            canvas.observe('mouse:move', this.mousemove);
            canvas.observe('mouse:up', this.mouseup);
            this.isListening = true;
        }
    }

    clean() {
        this.isListening = false;
        canvas.off('mouse:down', null);
        canvas.off('mouse:move', null);
        canvas.off('mouse:up', null);
    }
}