class Enemy {
    constructor(x, y, direction, health) {
        /*"abstract" class*/
        if (new.target === Enemy) {
            throw "not allowed!";
        }

        this.x = x;
        this.y = y;
        this.direction = direction;
        this.speed = 0.25;
        this.animationtime = 0;
        this.health = health;
        this.states = [];
        this.state = null;
        this.image = null;
    }

    setState(enemy, type) {
        let stateViews = [];
        for (let v = 0; v < 8; v++) {
            stateViews.push(this.setStateView(enemy, type, v));
        }
        return {
            type: type,
            views: stateViews
        }
    }

    setStateView(enemy, type, id) {
        let image = new Image();
        image.src = "texture/enemy/" + enemy + "/" + type + "/" + id + ".png";
        return {
            id: id,
            image: image
        };
    }

    getStateView(ppx, ppy, pod) {
        let x = this.x + Math.cos(this.direction * (Math.PI / 180));
        let y = this.y + Math.sin(this.direction * (Math.PI / 180));

        let px = ppx + Math.cos(pod * (Math.PI / 180));
        let py = ppy + Math.sin(pod * (Math.PI / 180));

        let dx = x - px;
        let dy = y - py;

        let angle = Math.atan2(dy, dx) * (180 / Math.PI);
        angle -= this.direction;
        angle += 180;

        if (angle < 0) {
            angle += 360;
        }
        if (angle > 360) {
            angle -= 360;
        }

        for (let i = 0; i < 360; i += 45) {
            let deviation = 45 / 2;
            let dirStart = i - deviation;
            if (dirStart < 0) {
                dirStart += 360;
            }
            let dirEnd = i + deviation;
            if (angle > dirStart && angle < dirEnd) {
                this.image = this.state.views[i / 45].image;
                return;
            }
        }

        this.image = this.state.views[0].image;
    }

    move(dt) {
        let speed = this.speed;
        if (dt > 0) {
            speed = speed * dt / 10;
        }
        const newx = this.x + Math.cos(this.direction * (Math.PI / 180)) * speed;
        const newy = this.y + Math.sin(this.direction * (Math.PI / 180)) * speed;
        const deviation = 10;
        const block = player.map.size;

        if (!(player.map.grid[Math.floor((newy + deviation) / block)][Math.floor((newx + deviation) / block)] !== 0 ||
                player.map.grid[Math.floor((newy - deviation) / block)][Math.floor((newx - deviation) / block)] !== 0 ||
                player.map.grid[Math.floor((newy + deviation) / block)][Math.floor((newx - deviation) / block)] !== 0 ||
                player.map.grid[Math.floor((newy - deviation) / block)][Math.floor((newx + deviation) / block)] !== 0 ||
                player.map.grid[Math.floor(newy / block)][Math.floor(newx / block)] !== 0)) {
            this.x = newx;
            this.y = newy;
        }
        else {
            this.turn(180);
        }
    }

    turn(deg) {
        this.direction += deg;
        if (this.direction > 360) {
            this.direction -= 360;
        }
        if (this.direction < 0) {
            this.direction += 360;
        }
    }
}
