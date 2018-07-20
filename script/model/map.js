class Map {
    constructor(texture) {
        this.texture = texture;
        this.size = 50;
        this.transform = 25000;
        this.grid = [
            [4, 4, 8, 8, 4, 4, 4, 8, 10, 10, 10],
            [4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 10],
            [4, 0, 0, 0, 0, 2, 0, 0, 0, 0, 11],
            [8, 0, 0, 0, 0, 2, 0, 0, 0, 0, 11],
            [4, 0, 0, 0, 0, 4, 4, 4, 0, 0, 1],
            [2, 2, 0, 0, 8, 4, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 8, 0, 0, 0, 0, 0, 1],
            [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
            [6, 6, 6, 0, 0, 0, 0, 5, 5, 0, 2],
            [6, 0, 0, 0, 0, 0, 0, 9, 0, 0, 2],
            [1, 0, 0, 6, 0, 0, 0, 2, 0, 0, 5],
            [1, 6, 6, 6, 1, 1, 1, 2, 2, 9, 5]
        ];
        /*
        this.grid = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 3, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 4, 0, 0, 5, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 6, 0, 0, 7, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 8, 0, 0, 9, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 10, 0, 0, 11, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 12, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
        */
        this.width = this.grid[0].length;
        this.height = this.grid.length;
        this.sprites = [
            new Sprite(75, 75, "plant", texture),
            new Sprite(230, 230, "pillar", texture),
            new Sprite(70, 230, "plant", texture),
            new Sprite(425, 525, "barrel", texture),
            new Sprite(75, 375, "armor", texture),
            new Sprite(375, 375, "table", texture),
            new Sprite(225, 525, "table", texture),
            new Sprite(475, 75, "pillar", texture)
            /*
            new Sprite(75, 75, "barrel", texture),
            new Sprite(175, 75, "barrel", texture),
            new Sprite(325, 75, "barrel", texture),
            new Sprite(425, 75, "barrel", texture),
            new Sprite(75, 725, "armor", texture),
            new Sprite(175, 725, "armor", texture),
            new Sprite(325, 725, "armor", texture),
            new Sprite(425, 725, "armor", texture)
            */
        ];
        this.wallIndex = [];
    }
}
