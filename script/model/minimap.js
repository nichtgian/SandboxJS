class Minimap {
    constructor(map, width, texture) {
        this.texture = texture;
        this.map = map;
        this.width = width;
        this.surface = width / (map.width * map.size) * map.size;
        this.height = this.surface * map.height;
    }

    render() {
        ctx.globalAlpha = 0.9;
        this.renderWalls();
        this.renderPlayer();
        this.renderSprites();
        ctx.globalAlpha = 1;
    }

    renderWalls() {
        ctx.fillStyle = texture.colors.ground;
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.fillStyle = texture.colors.default;

        for (let y = 0; y < this.map.height; y++) {
            for (let x = 0; x < this.map.width; x++) {
                if (this.map.grid[y][x] !== 0) {
                    ctx.fillRect(x * this.surface, y * this.surface, this.surface, this.surface);
                }
            }
        }
    }

    renderPlayer() {
        let size = 7;
        ctx.fillStyle = this.texture.colors.player;
        ctx.strokeStyle = this.texture.colors.default;

        ctx.beginPath();
        ctx.moveTo(
            player.x / this.map.size * this.surface + size * Math.cos(player.pod * Math.PI / 180),
            player.y / this.map.size * this.surface + size * Math.sin(player.pod * Math.PI / 180)
        );

        ctx.lineTo(
            player.x / this.map.size * this.surface + size * Math.cos((player.pod - 140)* Math.PI / 180),
            player.y / this.map.size * this.surface + size * Math.sin((player.pod - 140) * Math.PI / 180)
        );

        ctx.lineTo(
            player.x / this.map.size * this.surface + size * Math.cos((player.pod - 220)* Math.PI / 180),
            player.y / this.map.size * this.surface + size * Math.sin((player.pod - 220) * Math.PI / 180)
        );

        ctx.lineTo(
            player.x / this.map.size * this.surface + size * Math.cos(player.pod * Math.PI / 180),
            player.y / this.map.size * this.surface + size * Math.sin(player.pod * Math.PI / 180)
        );

        ctx.fill();
        ctx.stroke();
    }

    renderSprites() {
        ctx.fillStyle = this.texture.colors.default;
        for (let i = 0; i < this.map.sprites.length; i++) {
            this.renderSprite(this.map.sprites[i]);
        }
    }

    renderSprite(sprite) {
        ctx.beginPath();
        ctx.arc(
            sprite.x / this.map.size * this.surface,
            sprite.y / this.map.size * this.surface,
            this.surface / 10, 0, 2 * Math.PI, false
        );
        ctx.fill();
    }
}
