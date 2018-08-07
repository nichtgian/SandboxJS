class Joystick {
    constructor() {
        this.direction = 0;
        this.turnSpeed = 0;

        this.radius = 170;
        this.active = false;
        this.move = false; /*move or turn*/

        this.x = 0;
        this.y = 0;
        this.stickX = 0;
        this.stickY = 0;
    }

    render() {
        if (this.active) {
            this.renderMove();
        }
    }

    renderMove() {
        let width = 10;
        let size = 60;

        /*inner*/
        ctx.beginPath();
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = texture.colors.default;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();

        /*border*/
        ctx.beginPath();
        ctx.globalAlpha = 0.8;
        ctx.lineWidth = width;
        ctx.arc(this.x, this.y, this.radius + width / 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.lineWidth = 1;

        /*stick*/
        ctx.beginPath();
        ctx.arc(this.stickX, this.stickY, size, 0, 2 * Math.PI);
        ctx.fill();

        ctx.globalAlpha = 1;
    }

    moveStick(x, y) {
        let distance = Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
        if (distance <=  this.radius) {
            this.stickX = x;
            this.stickY = y;
        }
        else {
            let angle = Math.atan2(x - this.x, y - this.y);
            this.stickX = this.x + this.radius * Math.sin(angle);
            this.stickY = this.y + this.radius * Math.cos(angle);
        }

        player.moveDirection = 0;
        let backSpeed = 0.75;
        let speedY = (this.y - this.stickY) / 150;
        if (speedY < 0) {
            speedY = (speedY * backSpeed) * -1;
            player.moveDirection = 180;
        }
        player.speed = speedY;

        let speedX = -(this.x - this.stickX) / 50;
        player.turnSpeed = speedX;
    }
}