class Map {
    constructor(texture) {
        this.texture = texture;
        this.size = 50;

        this.grid = [
            /*25    125     225     325     425     525     625     725   */
            [ 1,  1,  1,  4,  4,  5,  5,  5,  5,  1,  1,  1,  5,  5,  5,  1], /*25*/
            [ 1,  0,  0,  4,  0,  0,  0,  9,  0,  0,  0,  0,  0,  0,  0,  1],
            [ 2,  0,  0,  4,  0,  0,  0,  9,  0,  0,  0,  4,  0,  0,  0,  1], /*125*/
            [ 2,  0,  8,  8,  0,  0,  4,  4,  0,  0,  0,  4,  4,  0,  0,  1],
            [ 1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  4,  0,  0,  1], /*225*/
            [ 1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  8,  8,  0,  1],
            [ 2,  0,  2,  2,  9,  0,  0,  0,  0,  0,  0,  0,  0,  8,  0,  1], /*325*/
            [ 2,  0,  0,  0,  9,  0,  0,  0,  0,  0,  0,  0,  0,  8,  0,  1],
            [ 2,  2,  2,  0,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1], /*425*/
            [ 1,  0,  0,  0,  2,  2,  0,  0,  0,  0,  0,  0,  0,  1,  1,  1],
            [ 1,  0,  0,  0,  0,  2,  0,  4,  4,  4,  4,  4,  0,  0,  0,  1], /*525*/
            [11,  0, 10, 10,  0,  2,  0,  8,  0,  0,  0,  7,  0,  0,  0,  1],
            [11,  0,  0, 10,  0,  0,  0,  4,  0,  0,  0,  7,  0,  0,  0,  1], /*625*/
            [11,  0,  0, 11,  0,  0,  0,  0,  0,  0,  0,  4,  4,  4,  0,  1],
            [10,  0,  0, 11,  0,  0,  0,  4,  0,  0,  0,  6,  0,  0,  0,  1], /*725*/
            [10, 10, 11, 11,  1,  1,  1,  8,  8,  6,  6,  6,  1,  1,  1,  1]
        ];

        this.width = this.grid[0].length;
        this.height = this.grid.length;

        this.sprites = [
            new Sprite(125, 75, "barrel", texture),
            new Sprite(125, 95, "fuel", texture),

            new Sprite(175, 275, "plant", texture),
            new Sprite(125, 275, "tablechairs", texture),
            new Sprite(225, 275, "table", texture),
            new Sprite(275, 425, "table", texture),

            new Sprite(225, 75, "pole", texture),
            new Sprite(325, 75, "armor2", texture),
            new Sprite(275, 75, "armor", texture),

            new Sprite(415, 70, "barrel", texture),
            new Sprite(445, 70, "ammo", texture),
            new Sprite(465, 70, "ammo", texture),
            new Sprite(415, 95, "grenades", texture),
            new Sprite(415, 120, "fuel", texture),

            new Sprite(125, 525, "pillar", texture),
            new Sprite(75, 475, "stonepillar", texture),
            new Sprite(225, 725, "barrel", texture),

            new Sprite(125, 625, "fountain", texture),
            new Sprite(115, 655, "puddle", texture),
            new Sprite(135, 675, "sink", texture),
            new Sprite(75, 725, "stonepillar", texture),

            new Sprite(415, 735, "toxic", texture),
            new Sprite(440, 735, "toxic", texture),
            new Sprite(465, 735, "barrel", texture),
            new Sprite(525, 575, "oven", texture),
            new Sprite(525, 735, "oven", texture),
            new Sprite(475, 575, "toxic", texture),
            new Sprite(505, 575, "bones", texture),
            new Sprite(535, 675, "bones", texture),
            new Sprite(420, 625, "bones2", texture),
            new Sprite(420, 575, "pole2", texture),
            new Sprite(535, 615, "bones2", texture),

            new Sprite(425, 475, "vase", texture),
            new Sprite(450, 475, "vase", texture),
            new Sprite(475, 475, "decayed", texture),
        ];

        this.enemys = [
            new Grenadier(495, 425, 270),
            new Soldier(725, 525, 0),
            new Grenadier(625, 625, 270)
        ];
    }
}
