class Player {
    constructor(x, y, pod) {
        this.x = x;
        this.y = y;
        this.pod = pod;
        this.speed = 1;
        this.resolution = 1;
        this.fov = 90 * Math.PI / 180;
        this.size = 15;

        this.texture = new Texture();
        this.map = new Map();
        this.minimap = new Minimap(this.map, this.texture, 220);
    }

    turn(speed) {
        if (this.pod >= 360) {
            this.pod -= 360;
        }
        if (this.pod < 0) {
            this.pod += 360;
        }
        player.pod += speed;
    }

    move(direction) {
        let deviation = this.size / 2;
        let block = this.map.size;

        this.x += Math.cos((this.pod + direction) * Math.PI / 180) * this.speed;
        this.y += Math.sin((this.pod + direction) * Math.PI / 180) * this.speed;

        if (this.map.grid[Math.floor((this.y + deviation) / block)][Math.floor((this.x + deviation) / block)] !== 0 ||
            this.map.grid[Math.floor((this.y - deviation) / block)][Math.floor((this.x - deviation) / block)] !== 0 ||
            this.map.grid[Math.floor((this.y + deviation) / block)][Math.floor((this.x - deviation) / block)] !== 0 ||
            this.map.grid[Math.floor((this.y - deviation) / block)][Math.floor((this.x + deviation) / block)] !== 0 ||
            this.map.grid[Math.floor(this.y / block)][Math.floor(this.x / block)] !== 0) {
            this.move(direction + 180);
        }
    }

    render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.minimap.render();
        this.renderWalls();
        this.minimap.render();
        this.fizzlefade();
    }

    renderWalls() {
        ctx.fillStyle = this.texture.colors.default;

        let resolution = Math.ceil(canvas.width / this.resolution);
        let id = 0;

        for (let x = 0; x < resolution; x++) {
            let viewDist = (canvas.width / this.resolution) / Math.tan((this.fov / 2));
            let rayx = (-resolution / 2 + x) * this.resolution;
            let rayDist = Math.sqrt(rayx * rayx + viewDist * viewDist);
            let rayAngle = Math.asin(rayx / rayDist);

            let wall = this.castWall(this.pod * Math.PI / 180 + rayAngle);
            this.drawWall(x, wall);
        }
    }

    castWall(angle) {
        const PI2 = Math.PI * 2;

        angle %= PI2;
        if (angle < 0) {
            angle += PI2;
        }

        let right = angle > PI2 * 0.75 || angle < PI2 * 0.25;
        let up = angle < 0 || angle > Math.PI;

        let sin = Math.sin(angle);
        let cos = Math.cos(angle);

        let dist = 0;
        let textureX;
        let texture;

        let slope = sin / cos;
        let dXVer = right ? 1 : -1;
        let dYVer = dXVer * slope;

        let px = this.x / 50;
        let py = this.y / 50;

        let x = right ? Math.ceil(px) : Math.floor(px);
        let y = py + (x - px) * slope;

        while (x >= 0 && x < this.map.width && y >= 0 && y < this.map.height) {
            let wallX = Math.floor(x + (right ? 0 : -1));
            let wallY = Math.floor(y);

            if (this.map.grid[wallY][wallX] > 0) {
                dist = Math.sqrt(Math.pow(x - px, 2) + Math.pow(y - py, 2));
                texture = this.map.grid[wallY][wallX];
                textureX = (y * 50) % 50;

                /*if (!right) {
                    textureX = 50 - textureX;
                }*/
                break;
            }
            x += dXVer;
            y += dYVer;
        }

        slope = cos / sin;

        let dYHor = up ? -1 : 1;
        let dXHor = dYHor * slope;

        y = up ? Math.floor(py) : Math.ceil(py);
        x = px + (y - py) * slope;

        while (x >= 0 && x < this.map.width && y >= 0 && y < this.map.height) {
            let wallY = Math.floor(y + (up ? -1 : 0));
            let wallX = Math.floor(x);

            if (this.map.grid[wallY][wallX] > 0) {
                let distHor = Math.sqrt(Math.pow(x - px, 2) + Math.pow(y - py, 2));

                if (distHor < dist) {
                    dist = distHor;
                    texture = this.map.grid[wallY][wallX];
                    textureX = (x * 50) % 50;

                    /*if (up) {
                        textureX = 50 - textureX;
                    }*/
                }
                break;
            }
            x += dXHor;
            y += dYHor;
        }

        return {
            distance: dist,
            texture: texture,
            textureX: textureX
        };
    }

    drawWall(x, wall) {
        let dist = 1200 / wall.distance;
        let texture = this.texture.walls[wall.texture -1];
        if (texture != undefined) {
            texture = texture.image;
        }
        let textureX = wall.textureX;

        ctx.fillRect(x, canvas.height / 2 - dist / 2, 1, dist);
        ctx.drawImage(texture, texture.width / 50 * textureX, 0, texture.width / 50, texture.height, x, canvas.height / 2 - dist / 2, 1, dist);
    }

    isWall(x, y) {
        x = Math.floor(x / this.map.size);
        y = Math.floor(y / this.map.size);
        return this.map.grid[x] === undefined ||
            this.map.grid[x][y] === undefined ||
            this.map.grid[x][y] !== 0;
    }

    getWallTexture(x, y) {
        x = Math.floor(x / this.map.size);
        y = Math.floor(y / this.map.size);
        if (this.map.grid[x] !== undefined ||
            this.map.grid[x][y] !== undefined ||
            this.map.grid[x][y] !== 0) {
            return this.texture.walls[this.map.grid[x][y] - 1].image;
        }
    }

    async fizzlefade() {

    }
}
