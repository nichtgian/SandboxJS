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
            this.setWall(1, "stone",       ".jpg"),
            this.setWall(2, "wood",        ".jpg"),
            this.setWall(3, "brick",       ".jpg"),
            this.setWall(4, "cobble",      ".png"),
            this.setWall(5, "colorstone",  ".png"),
            this.setWall(6, "purplestone", ".png"),
            this.setWall(7, "bluestone",   ".png"),
            this.setWall(8, "mossy",       ".png")
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
            this.setSprite(1, "table"),
            this.setSprite(2, "armor"),
            this.setSprite(3, "light"),
            this.setSprite(4, "plant"),
            this.setSprite(5, "plant"),
            this.setSprite(6, "pillar")
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
            this.setSkybox(1, "sky", ".jpg"),
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
            ground: "#eae0c8"
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
            console.log(this.loadingLength + " textures loaded!");
            player.render();
        }
    }
}