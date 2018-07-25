class Enemy {
    constructor(x, y, direction, health) {
        /*"abstract" class*/
        if (new.target === Enemy) {
            throw "!";
        }

        this.x = x;
        this.y = y;
        this.direction = direction;
        this.health = health;
        this.state = null;
        this.states = [];
    }
}
