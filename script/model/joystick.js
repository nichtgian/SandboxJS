class Joystick {
    constructor() {
        this.moveActive = false;
        this.turnActive = false;

        this.radius = 170;

        this.moveX = 0;
        this.moveY = 0;
        this.moveSX = 0;
        this.moveSY = 0;

        this.turnX = 0;
        this.turnY = 0;
        this.turnSX = 0;
        this.turnSY = 0;
    }

    render() {
        if (this.moveActive) {
            this.renderJoystick(true);
        }
        if (this.turnActive) {
            this.renderJoystick(false);
        }
    }

    renderJoystick(moveJoystick) {
        let width = 10;
        let size = 60;
        let pos = this.getPos(moveJoystick);

        /*inner*/
        ctx.beginPath();
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = texture.colors.default;
        ctx.arc(pos.x, pos.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();

        /*border*/
        ctx.beginPath();
        ctx.globalAlpha = 0.8;
        ctx.lineWidth = width;
        ctx.arc(pos.x, pos.y, this.radius + width / 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.lineWidth = 1;

        /*stick*/
        ctx.beginPath();
        ctx.arc(pos.sx, pos.sy, size, 0, 2 * Math.PI);
        ctx.fill();

        ctx.globalAlpha = 1;
    }

    input(x, y, moveJoystick) {
        let pos = this.getPos(moveJoystick);
        let distance = Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));

        if (distance <=  this.radius) {
            pos.sx = x;
            pos.sy = y;
        }
        else {
            let angle = Math.atan2(x - pos.x, y - pos.y);
            pos.sx = pos.x + this.radius * Math.sin(angle);
            pos.sy = pos.y + this.radius * Math.cos(angle);
        }

        this.setPos(pos, moveJoystick);

        if (moveJoystick) {
            this.moveInput();
        }
        else {
            this.turnInput();
        }
    }

    moveInput() {
        let direction = Math.atan2(this.moveSX - this.moveX, this.moveY - this.moveSY);
        direction = direction / Math.PI * 180;
        if (direction < 0) {
            direction += 360;
        }

        player.moveDirection = direction;
        player.speed = Math.sqrt(Math.pow(this.moveX - this.moveSX, 2) + Math.pow(this.moveY - this.moveSY, 2)) / 200;
    }

    turnInput() {
        let lookSpeed = -(this.turnSY - this.turnY) / 5;
        let turnSpeed = -(this.turnX - this.turnSX) / 50;
        player.turnSpeed = turnSpeed;
        player.lookSpeed = lookSpeed;
    }

    setPos(pos, moveJoystick) {
        if (moveJoystick) {
            this.moveSX = pos.sx;
            this.moveSY = pos.sy;
        }
        else {
            this.turnSX = pos.sx;
            this.turnSY = pos.sy;
        }
    }

    getPos(moveJoystick) {
        let pos = {
            x: this.moveX,
            y: this.moveY,
            sx: this.moveSX,
            sy: this.moveSY
        };

        if (!moveJoystick) {
            pos.x = this.turnX;
            pos.y = this.turnY;
            pos.sx = this.turnSX;
            pos.sy = this.turnSY;
        }

        return pos;
    }
}