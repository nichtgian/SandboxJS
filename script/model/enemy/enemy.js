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
}
