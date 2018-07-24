class Map {
    constructor(texture) {
        this.texture = texture;
        this.size = 50;
        this.transform = 25000;

        this.grid = [
            [ 1,  1,  1,  4,  4,  5,  5,  5,  5,  1,  1,  1,  5,  5,  5,  1],
            [ 1,  0,  0,  4,  0,  0,  0,  9,  0,  0,  0,  0,  0,  0,  0,  1],
            [ 2,  0,  0,  4,  0,  0,  0,  9,  0,  0,  0,  0,  0,  0,  0,  1],
            [ 2,  0,  8,  8,  0,  0,  4,  4,  0,  0,  0,  0,  4,  0,  0,  1],
            [ 1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  4,  0,  0,  1],
            [ 1,  0,  0,  0,  0,  0,  0,  2,  0,  0,  0,  0,  8,  8,  0,  1],
            [ 2,  0,  2,  2,  2,  0,  0,  2,  2,  2,  0,  0,  0,  8,  0,  1],
            [ 2,  0,  0,  0,  2,  0,  0,  2,  0,  0,  0,  0,  0,  8,  0,  1],
            [ 2,  2,  2,  0,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1],
            [ 1,  0,  0,  0,  2,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1,  1],
            [ 1,  0,  0,  0,  0,  0,  0,  4,  4,  4,  4,  4,  0,  0,  0,  1],
            [11,  0, 10, 10,  0,  0,  0,  8,  0,  0,  0,  7,  0,  0,  0,  1],
            [11,  0,  0, 10,  0,  0,  0,  4,  0,  0,  0,  7,  0,  0,  0,  1],
            [11,  0,  0, 11,  0,  0,  0,  0,  0,  0,  0,  4,  4,  4,  0,  1],
            [10,  0,  0, 11,  0,  0,  0,  4,  0,  0,  0,  6,  0,  0,  0,  1],
            [10, 10, 11, 11,  1,  1,  1,  8,  8,  6,  6,  6,  1,  1,  1,  1]
        ];

        this.width = this.grid[0].length;
        this.height = this.grid.length;
        this.sprites = [
            new Sprite(125, 75, "barrel", texture),
            new Sprite(125, 95, "fuel", texture),

            new Sprite(175, 275, "plant", texture),
            new Sprite(125, 275, "table", texture),
            new Sprite(225, 275, "table", texture),

            new Sprite(225, 75, "pole", texture),
            new Sprite(325, 75, "pole", texture),
            new Sprite(275, 75, "armor", texture),

            new Sprite(425, 75, "barrel", texture),
            new Sprite(445, 65, "ammo", texture),
            new Sprite(465, 70, "ammo", texture),
            new Sprite(415, 95, "fuel", texture),

            new Sprite(125, 525, "pillar", texture),
            new Sprite(75, 475, "pillar", texture),
            new Sprite(225, 625, "barrel", texture),

            new Sprite(125, 625, "fountain", texture),
            new Sprite(115, 655, "puddle", texture),
            new Sprite(135, 675, "puddle", texture),

            new Sprite(415, 735, "toxic", texture),
            new Sprite(440, 735, "toxic", texture),
            new Sprite(475, 575, "toxic", texture),
            new Sprite(505, 575, "bones", texture),
            new Sprite(535, 675, "bones", texture),
            new Sprite(425, 475, "vase", texture),
            new Sprite(450, 475, "vase", texture),
            new Sprite(475, 475, "decayed", texture),
        ];
    }
}
