let canvas = document.getElementById("display");
let ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
ctx.font = "30px Arial";

ctx.fillText("loading assets!", canvas.width / 2 - 50, canvas.height / 2 - 20);

let texture = new Texture();
