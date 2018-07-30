class Grenadier extends Enemy {
    constructor(x, y, direction) {
        super(x, y, direction, 100);
        this.states = [
            this.setState("grenadier", "stand"),
            this.setState("grenadier", "walk0"),
            this.setState("grenadier", "walk1"),
            this.setState("grenadier", "walk2"),
            this.setState("grenadier", "walk3")
        ];
        this.state = this.states[0];
    }

    walk(dt) {
        if (this.state === this.states[0]) {
            this.animationtime = Date.now();
            this.state = this.states[1];
        }

        if (Date.now() - this.animationtime >= 200) {
            if (this.state === this.states[1]) {
                this.state = this.states[2];
            }
            else if (this.state === this.states[2]) {
                this.state = this.states[3];
            }
            else if (this.state === this.states[3]) {
                this.state = this.states[4];
            }
            else {
                this.state = this.states[1];
            }
            this.animationtime = Date.now();
        }

        this.move(dt);
    }
}