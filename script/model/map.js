class Map {
    constructor() {
        this.size = 50;
        this.transform = 25000;
        this.grid = [
            [1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [2, 0, 0, 0, 0, 7, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 2, 2, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1],
            [1, 0, 5, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1],
            [1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
        this.width = this.grid[0].length;
        this.height = this.grid.length;
        this.sprite = [
            new Sprite(75,  75,  "plant"),
            new Sprite(240, 240, "pillar"),
            new Sprite(60,  240, "plant"),
            new Sprite(240, 60,  "barrel"),
            new Sprite(125, 325, "table"),
            new Sprite(350, 350, "table"),
            new Sprite(450, 150, "table")
        ];
        this.wallIndex = [];
    }

    renderSprite(sprite) {
        /*distance between player and sprite*/
        let distance = getDistance(player.x, player.y, sprite.x, sprite.y);

        /*size of sprite, calculated from distance divided by a const*/
        let size = this.transform / distance;

        /*an imaginary point going out from player in direction of pod */
        let podPoint = {x: player.x + 100  * Math.cos(player.pod * Math.PI / 180), y: player.y + 100 * Math.sin(player.pod * Math.PI / 180)};

        /*p1 player, p2 sprite, p3 podPoint, calculates angle from two lines with same origin*/
        let angle = (Math.atan2(sprite.y - player.y, sprite.x - player.x) - Math.atan2(podPoint.y - player.y, podPoint.x - player.x)) * 180 /Math.PI;

        if (angle < 360) {
            angle += 360;
        }

        if (angle > 360) {
            angle -= 360;
        }

        /*position on canvas x*/
        let drawx = canvas.width * 4 / 360 * (angle + 45);

        /*position on canvas y*/
        let drawy = canvas.height / 2 - size / 2;

        /*lil cheating solution*/
        if (drawx < - (3* canvas.width)) {
            drawx += (4* canvas.width);
        }
        else if (drawx > (3* canvas.width)) {
            drawx -= (4* canvas.width);
        }

        /*draw image*/
        ctx.drawImage(sprite.source, drawx - size / 2, drawy, size, size);

        /*for every y pixel of sprite*/
        for (let i = 0; i < sprite.source.width; i++) {
            let pixel =
            ctx.drawImage(sprite.source, i, 0, 1, sprite.source.height, drawx + i, drawy, size / sprite.source.width, size);
        }
    }

    renderSky() {
        /*draw image*/
        ctx.drawImage(Texture.Material.Sky, 1920 / 360 * player.pod, 0, 1920 / 4, 1080, 0, 0, canvas.width, canvas.height / 1.5);

        /*draw image next to first image*/
        ctx.drawImage(Texture.Material.Sky, 1920 / 360 * (player.pod - 360), 0, 1920 / 4, 1080, 0, 0, canvas.width, canvas.height / 1.5);

        /*draw a ground*/
        ctx.fillStyle = Texture.Material.Ground;
        ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);
    }

    renderBlock() {
        let resolution = canvas.width;
        for (let x = 0; x < resolution; x++) {
            let ray = player.pod + (-player.fov / 2 + player.fov / resolution * x);
            let distance = 0, offset = 0;
            let texture;
            let hit = false, shadow = false;
            do {
                let rayx = player.x + distance * Math.cos(ray * (Math.PI / 180));
                let rayy = player.y + distance * Math.sin(ray * (Math.PI / 180));
                if (this.grid[Math.floor(rayy / this.block)][Math.floor(rayx / this.block)] != Texture.Wall.Empty.Material) {
                    texture = getWallSource(this.grid[Math.floor(rayy / this.block)][Math.floor(rayx / this.block)]);
                    distance = Math.sqrt(Math.pow(player.x - rayx, 2) + Math.pow(player.y - rayy, 2));
                    offset = Math.floor(rayx % 64);
                    if (Math.floor(rayx % 64) == 0 || Math.floor((rayx + 1) % 64) == 0) {
                        offset = Math.floor(rayy % 64);
                    }
                    if (rayx % 64 > rayy % 64) {
                        shadow = true;
                    }
                    /*if(x == 0){ //distance for minimap -45
                        distance1 = distance;
                    }
                    if(x == resolution - 1){ //distance for minimap +45
                        distance2 = distance;
                    }*/
                    hit = true;
                }
                distance += 2;
                if (distance > 10000) {
                    hit = true;
                }
            } while (!hit);
            distance = Math.floor(this.transform / distance);
            /*if(shadow){
                ctx.fillStyle = "#000";
                ctx.fillRect(x, display.height / 2 - distance / 2, 1, distance); //base coloring for shadow (x pos, center rectangle, width of rectangle (display / resolution = 1), height of rectangle
                ctx.globalAlpha = 0.75; //shadow -> make texture mix with black background -> darker
            }*/
            this.wallIndex.push(distance);
            ctx.drawImage(texture, offset / 64 * texture.width, 0, texture.width / (canvas.width / 2), texture.height, x, canvas.height / 2 - distance / 2, 1, distance);
            ctx.globalAlpha = 1.0;
            let raydirX = Math.cos(((x / 1600 * 90) * this.pov) * (Math.PI / 180)); //angle to x y pos
            let raydirY = Math.sin(((x / 1600 * 90) * this.pov) * (Math.PI / 180));
        }
    }
}
