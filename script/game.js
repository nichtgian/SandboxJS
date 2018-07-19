let canvas = document.getElementById("display");
let ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

let player = new Player(225, 225, 40);