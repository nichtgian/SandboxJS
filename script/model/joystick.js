class Joystick {
    constructor() {
        this.direction = 0;
        this.turnSpeed = 0;
        this.lookSpeed = 0;
    }

    render() {
        this.renderMove();
        this.renderTurn();
    }

    renderMove() {
        let x = 50;
        let y = 630;
        let size = 70;
        let gap = 5;

        ctx.fillStyle = texture.colors.default;
        ctx.globalAlpha = 0.8;

        /*up*/
        ctx.fillRect(x + size + gap, y, size, size);

        /*left*/
        ctx.fillRect(x, y + size + gap, size, size);

        /*right*/
        ctx.fillRect(x + 2 * (size + gap), y + size + gap, size, size);

        /*down*/
        ctx.fillRect(x + size + gap, y + 2 * (size + gap), size, size);

        ctx.globalAlpha = 1;
    }

    renderTurn() {
        let x = 1450;
        let y = 750;
        let radius = 100;
        let width = 10;
        let size = 35;

        /*inner*/
        ctx.beginPath();
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = texture.colors.default;
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();

        /*border*/
        ctx.beginPath();
        ctx.globalAlpha = 0.8;
        ctx.lineWidth = width;
        ctx.arc(x, y, radius + width / 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.lineWidth = 1;

        /*border*/
        ctx.beginPath();
        ctx.globalAlpha = 0.8;
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.fill();

        ctx.globalAlpha = 1;
    }
}