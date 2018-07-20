let player = null;
let lastRender = 0;

function start() {
    player = new Player(100, 100, 45, texture);
    window.requestAnimationFrame(loop);
}

function update() {
}

function render() {
    player.render();
}

function loop(timestamp) {
    update();
    render();

    lastRender = timestamp;
    window.requestAnimationFrame(loop);
}