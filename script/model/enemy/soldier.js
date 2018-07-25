class Soldier extends Enemy {
    constructor(x, y, direction) {
        super(x, y, direction, 100);
        this.states = [
            this.setState("stand")
        ];
        this.state = this.states[0];
    }

    setState(type) {
        let stateViews = [];
        for (let v = 0; v < 8; v++) {
            stateViews.push(this.setStateView(type, v));
        }
        return {
            type: type,
            views: stateViews
        }
    }

    setStateView(type, id) {
        let image = new Image();
        image.src = "texture/enemy/soldier/" + type + "/" + id + ".png";
        return {
            id: id,
            image: image
        };
    }
}