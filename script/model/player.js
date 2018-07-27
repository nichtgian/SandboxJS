class Player {
    constructor(x, y, pod, texture) {
        this.texture = texture;
        this.x = x;
        this.y = y;
        this.pod = pod;
        this.resolution = 1;
        this.fov = 90 * (Math.PI / 180);
        this.size = 15;
        this.look = 0;

        this.speed = 0;
        this.turnSpeed = 0;
        this.lookSpeed = 0;
        this.moveDirection = 0;

        this.zIndex = [];
        this.podDistance = 0;
        this.joystick = new Joystick();
        this.map = new Map(texture);
        this.minimap = new Minimap(this.map, 250, texture);
    }

    turn(turn, look) {
        this.look += look;
        if (this.look > 1000) {
            this.look = 1000;
        }
        if (this.look < -1000) {
            this.look = -1000;
        }

        this.pod += turn;
        if (this.pod >= 360) {
            this.pod -= 360;
        }
        if (this.pod < 0) {
            this.pod += 360;
        }
    }

    move(dt) {
        this.turn(this.turnSpeed, this.lookSpeed);

        if (this.speed === 0) {
            return;
        }

        const speed = this.speed * dt / 10;
        const deviation = this.size / 2;
        const block = this.map.size;

        let newx = this.x + Math.cos((this.pod + this.moveDirection) * (Math.PI / 180)) * speed;
        let newy = this.y + Math.sin((this.pod + this.moveDirection) * (Math.PI / 180)) * speed;

        if (!(this.map.grid[Math.floor((newy+ deviation) / block)][Math.floor((newx + deviation) / block)] !== 0 ||
            this.map.grid[Math.floor((newy - deviation) / block)][Math.floor((newx - deviation) / block)] !== 0 ||
            this.map.grid[Math.floor((newy + deviation) / block)][Math.floor((newx - deviation) / block)] !== 0 ||
            this.map.grid[Math.floor((newy - deviation) / block)][Math.floor((newx + deviation) / block)] !== 0 ||
            this.map.grid[Math.floor(newy / block)][Math.floor(newx / block)] !== 0)) {
            this.x = newx;
            this.y = newy;
        }
    }

    update(dt) {
        this.move(dt);
    }

    render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.renderSkybox();
        this.renderWalls();
        this.renderEnemys();
        this.renderSprites();
        this.renderUI();

        this.minimap.render();
        //this.joystick.render();
    }

    renderWalls() {
        ctx.fillStyle = this.texture.colors.shadow;

        this.zIndex = [];
        let resolution = Math.ceil(canvas.width / this.resolution);

        for (let x = 0; x < resolution; x++) {
            let viewDist = (canvas.width / this.resolution) / Math.tan((this.fov / 2));
            let rayx = (-resolution / 2 + x) * this.resolution;
            let rayDist = Math.sqrt(rayx * rayx + viewDist * viewDist);
            let rayAngle = Math.asin(rayx / rayDist);

            let wall = this.castWall(this.pod * (Math.PI / 180) + rayAngle);
            if (x === resolution / 2) {
                this.podDistance = wall.distance;
            }
            this.renderWall(x, wall);
        }
    }

    castWall(angle) {
        const PI2 = Math.PI * 2;
        angle %= PI2;

        if (angle < 0) {
            angle += PI2;
        }

        const right = angle > PI2 * 0.75 || angle < PI2 * 0.25;
        const up = angle < 0 || angle > Math.PI;

        const sin = Math.sin(angle);
        const cos = Math.cos(angle);

        const px = this.x / 50;
        const py = this.y / 50;

        let shadow = false;

        let dist = 0;
        let textureX;
        let texture;

        let slope = sin / cos;
        let dXVer = right ? 1 : -1;
        let dYVer = dXVer * slope;

        let x = right ? Math.ceil(px) : Math.floor(px);
        let y = py + (x - px) * slope;

        while (x >= 0 && x < this.map.width && y >= 0 && y < this.map.height) {
            let wallX = Math.floor(x + (right ? 0 : -1));
            let wallY = Math.floor(y);

            if (this.map.grid[wallY][wallX] > 0) {
                dist = Math.sqrt(Math.pow(x - px, 2) + Math.pow(y - py, 2));
                texture = this.map.grid[wallY][wallX];
                textureX = (y * 50) % 50;

                if (!right) {
                    textureX = 50 - textureX;
                    shadow = true;
                }
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

                if (dist === 0 || distHor < dist) {
                    shadow = true;
                    dist = distHor;
                    texture = this.map.grid[wallY][wallX];
                    textureX = (x * 50) % 50;

                    if (!up) {
                        shadow = false;
                        textureX = 50 - textureX;
                    }
                }
                break;
            }
            x += dXHor;
            y += dYHor;
        }

        this.zIndex.push(dist);
        dist *= Math.cos(this.pod * (Math.PI / 180) - angle);

        return {
            distance: dist,
            texture: texture,
            textureX: textureX,
            shadow: shadow
        };
    }

    renderWall(x, wall) {
        let size = 1200 / wall.distance;
        let texture = this.texture.walls[wall.texture -1].image;
        let textureX = Math.floor(texture.width / 50 * wall.textureX);

        ctx.drawImage(
            texture, textureX, 0, 1, texture.height,
            x, canvas.height / 2 - size / 2 + this.look, 1, size
        );

        if (wall.shadow) {
            ctx.globalAlpha = 0.4;
            ctx.fillRect(x, canvas.height / 2 - size / 2 + this.look, 1, size);
            ctx.globalAlpha = 1;
        }
    }

    renderEnemys() {
        for (let i = 0; i < this.map.enemys.length; i++) {
            let enemy = this.map.enemys[i];
            enemy.getStateView(this.x, this.y, this.pod);
        }
    }

    renderSprites() {
        let sprites = [];

        for (let i = 0; i < this.map.sprites.length; i++) {
            let sprite = this.map.sprites[i];
            let dx = (sprite.x - this.x) / 50;
            let dy = (sprite.y - this.y) / 50;
            let angle = Math.atan2(dy, dx) - this.pod * (Math.PI / 180);

            if (angle < -Math.PI) {
                angle += 2 * Math.PI;
            }
            if (angle >= Math.PI) {
                angle -= 2 * Math.PI;
            }

            if (angle > -Math.PI * 0.5 && angle < Math.PI * 0.5) {
                let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                let viewDist = (canvas.width / this.resolution) / Math.tan((this.fov / 2));
                let size = 1200 / (Math.cos(angle) * distance);

                sprites.push({
                    distance: distance,
                    angle: angle,
                    viewDist: viewDist,
                    size: size,
                    image: sprite.image,
                });
            }
        }

        for (let i = 0; i < this.map.enemys.length; i++) {
            let enemy = this.map.enemys[i];
            let dx = (enemy.x - this.x) / 50;
            let dy = (enemy.y - this.y) / 50;
            let angle = Math.atan2(dy, dx) - this.pod * (Math.PI / 180);

            if (angle < -Math.PI) {
                angle += 2 * Math.PI;
            }
            if (angle >= Math.PI) {
                angle -= 2 * Math.PI;
            }

            if (angle > -Math.PI * 0.5 && angle < Math.PI * 0.5) {
                let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                let viewDist = (canvas.width / this.resolution) / Math.tan((this.fov / 2));
                let size = 1200 / (Math.cos(angle) * distance);

                sprites.push({
                    distance: distance,
                    angle: angle,
                    viewDist: viewDist,
                    size: size,
                    image: enemy.image,
                });
            }
        }

        sprites.sort(function(a, b) {
            if (a.distance < b.distance) {
                return 1;
            }
            if (a.distance > b.distance) {
                return -1;
            }
            return 0;
        });

        for (let i = 0; i < sprites.length; i++) {
            let sprite = sprites[i];
            let x = Math.tan(sprite.angle) * sprite.viewDist;
            let left = canvas.width / 2 + x - sprite.size / 2;

            this.renderSprite(sprite.image, sprite.distance, left, sprite.size);
        }
    }

    renderSprite(image, distance, left, size) {
        if (image === null) {
            return;
        }

        let resolution = 2;
        for (let i = 0; i < image.width * resolution; i++) {
            let pixel = size / image.width;
            let x = pixel * i;

            if (this.zIndex[Math.round(left + x / resolution)] < distance) {
                continue;
            }

            ctx.drawImage(
                image,
                i / resolution, 0, 1 / resolution, image.height,
                left + x / resolution, (canvas.height - size) / 2 + this.look, pixel, size
            );
        }

        /*show all*/
        /*
        ctx.drawImage(image, left, (canvas.height - size) / 2, size, size);
         */
        /*bad performance, most accurate*/
        /*
        for (let i = left; i < left + size; i++) {
            if (this.zIndex[Math.round(i)] <= distance) {
                continue;
            }

            ctx.drawImage(
                image,
                image.width / size * (i - left), 0, 1, image.height,
                i, (canvas.height - size) / 2, 1, size
            );
        }
        */
    }

    renderSkybox() {
        let image = texture.skyboxes[0].image;
        ctx.drawImage(
            image,
            image.width / (6 * 60) * this.pod, 0, image.width / 6, image.height,
            0, -image.height * 2 + this.look, canvas.width, image.height * 3.5
        );
        ctx.drawImage(
            image,
            image.width / (6 * 60) * (this.pod - 360), 0, image.width / 6, image.height,
            0, -image.height * 2 + this.look, canvas.width, image.height * 3.5
        );
        ctx.fillStyle = texture.colors.ground;
        ctx.fillRect(0, canvas.height / 2 + this.look, canvas.width, canvas.height / 2 - this.look);
    }

    renderUI() {
        ctx.fillStyle = this.texture.colors.default;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 2.5, 0, 2 * Math.PI, false);
        ctx.fill();
    }
}
