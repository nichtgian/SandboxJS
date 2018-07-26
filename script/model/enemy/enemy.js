class Enemy {
    constructor(x, y, direction, health) {
        /*"abstract" class*/
        if (new.target === Enemy) {
            throw "not allowed!";
        }

        this.x = x;
        this.y = y;
        this.direction = direction;
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

        let angle = Math.atan2(y - py, x - px) * (180 / Math.PI);
        angle += this.direction;
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
}
