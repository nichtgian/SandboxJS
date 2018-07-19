class Minimap {
    constructor(map, texture, width) {
        this.map = map;
        this.texture = texture;
        this.width = width;
        this.surface = width / (map.width * map.size) * map.size;
        this.height = this.surface * map.height;
    }

    render() {
        this.renderWalls();
        this.renderPlayer();
    }

    renderWalls() {
        ctx.fillStyle = this.texture.colors.ground;
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.fillStyle = this.texture.colors.default;

        for (let y = 0; y < this.map.height; y++) {
            for (let x = 0; x < this.map.width; x++) {
                if (this.map.grid[y][x] !== 0) {
                    //let img = getWallSource(this.map.grid[y][x]);
                    //ctx.drawImage(img, x * this.blockSurface, y * this.blockSurface, this.blockSurface, this.blockSurface);
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

        /*player front side*/
        ctx.moveTo(player.x / this.map.size * this.surface + size * Math.cos(player.pod * Math.PI / 180), player.y / this.map.size * this.surface + size * Math.sin(player.pod * Math.PI / 180));

        /*player back left side*/
        ctx.lineTo(player.x / this.map.size * this.surface + size * Math.cos((player.pod - 140)* Math.PI / 180), player.y / this.map.size * this.surface + size * Math.sin((player.pod - 140) * Math.PI / 180));

        /*player back right side*/
        ctx.lineTo(player.x / this.map.size * this.surface + size * Math.cos((player.pod - 220)* Math.PI / 180), player.y / this.map.size * this.surface + size * Math.sin((player.pod - 220) * Math.PI / 180));

        /*back to player front side*/
        ctx.lineTo(player.x / this.map.size * this.surface + size * Math.cos(player.pod * Math.PI / 180), player.y / this.map.size * this.surface + size * Math.sin(player.pod * Math.PI / 180));

        /*draw player triangle*/
        ctx.fill();
        ctx.stroke();
    }

    renderSprite(sprite) {
        /*draw sprite as circle*/
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.arc(sprite.x / environment.block * this.blockSurface, sprite.y / environment.block * this.blockSurface, this.blockSurface / 10, 0, 2 * Math.PI, false);
        ctx.fill();
    }
}
