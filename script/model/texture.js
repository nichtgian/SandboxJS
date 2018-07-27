class Texture {
    constructor() {
        this.walls = this.setWalls();
        this.sprites = this.setSprites();
        this.skyboxes = this.setSkyboxes();
        this.colors = this.setColors();

        this.loadingCounter = 0;
        this.loadingTextures = [
            this.walls,
            this.sprites,
            this.skyboxes
        ];

        this.loadingLength = 0;
        this.loadingTextures.forEach((type) => {
            this.loadingLength += type.length;
        });

        this.loading();
    }

    setWalls() {
        return [
            this.setWall(1, "stone", ".jpg"),
            this.setWall(2, "wood", ".jpg"),
            this.setWall(3, "brick", ".jpg"),
            this.setWall(4, "cobble", ".png"),
            this.setWall(5, "colorstone", ".png"),
            this.setWall(6, "purplestone", ".png"),
            this.setWall(7, "bluestone", ".png"),
            this.setWall(8, "mossy", ".png"),
            this.setWall(9, "castle", ".jpg"),
            this.setWall(10, "plaster", ".jpg"),
            this.setWall(11, "whitestone", ".jpg"),
            this.setWall(12, "banner", ".png")
        ];
    }

    setWall(id, name, filetype) {
        let image = new Image();
        image.src = "texture/wall/" + name + filetype;
        return {
            id: id,
            name: name,
            image: image
        };
    }

    setSprites() {
        return [
            this.setSprite(1, "ammo"),
            this.setSprite(2, "armor"),
            this.setSprite(3, "barrel"),
            this.setSprite(4, "bones"),
            this.setSprite(5, "cage"),
            this.setSprite(6, "chandalier"),
            this.setSprite(7, "decayed"),
            this.setSprite(8, "dogfood"),
            this.setSprite(9, "food"),
            this.setSprite(10, "fountain"),
            this.setSprite(11, "fuel"),
            this.setSprite(12, "lamp"),
            this.setSprite(13, "light"),
            this.setSprite(14, "pillar"),
            this.setSprite(15, "plant"),
            this.setSprite(16, "pole"),
            this.setSprite(17, "pot"),
            this.setSprite(18, "puddle"),
            this.setSprite(19, "table"),
            this.setSprite(20, "toxic"),
            this.setSprite(21, "vase"),
            this.setSprite(22, "medic"),
            this.setSprite(23, "bag"),
            this.setSprite(24, "grenades"),
            this.setSprite(25, "stonepillar"),
            this.setSprite(26, "tablechairs"),
            this.setSprite(27, "armor2"),
            this.setSprite(28, "bones2"),
            this.setSprite(29, "cage2"),
            this.setSprite(30, "cage3"),
            this.setSprite(31, "light2"),
            this.setSprite(32, "oven"),
            this.setSprite(33, "pole2"),
            this.setSprite(34, "sink"),
            this.setSprite(35, "table2")
        ];
    }

    setSprite(id, name) {
        let image = new Image();
        image.src = "texture/sprite/" + name + ".png";
        return {
            id: id,
            name: name,
            image: image
        };
    }

    setSkyboxes() {
        return [
            this.setSkybox(1, "pixel", ".jpg"),
            this.setSkybox(2, "real", ".jpg"),
            this.setSkybox(3, "heaven", ".png")
        ];
    }

    setSkybox(id, name, filetype) {
        let image = new Image();
        image.src = "texture/skybox/" + name + filetype;
        return {
            id: id,
            name: name,
            image: image
        };
    }

    setColors() {
        return {
            default: "#16142e",
            ground: "rgb(200,200,200)",
            player: "#83a9fe",
            shadow: "#020304",
            enemy: "#ff2233"
        }
    }

    loading() {
        this.loadingTextures.forEach((type) => {
            type.forEach((texture) => {
                texture.image.onload = () => {
                    this.imageLoaded();
                };
            });
        });
    }

    imageLoaded() {
        this.loadingCounter++;
        if (this.loadingCounter >= this.loadingLength) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillText(this.loadingLength + " textures loaded!", canvas.width / 2 - 50, canvas.height / 2 - 20);
            setTimeout(() => {
                start();
            }, 250);
        }
    }
}