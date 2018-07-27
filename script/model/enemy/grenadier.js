class Grenadier extends Enemy {
    constructor(x, y, direction) {
        super(x, y, direction, 100);
        this.states = [
            this.setState("grenadier", "stand")
        ];
        this.state = this.states[0];
    }
}