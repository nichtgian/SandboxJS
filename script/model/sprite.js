class Sprite {
    constructor(x, y, type, texture) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.image = this.getSpriteImage(texture, type);
    }

    getSpriteImage(texture, type) {
        for (let i = 0; i < texture.sprites.length; i++) {
            let sprite = texture.sprites[i];
            if (sprite.name === type) {
                return sprite.image;
            }
        }
    }
}
