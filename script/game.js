let player = null;
let cycleTime = 0;

function start() {
    player = new Player(75, 75, 90, texture);
    window.requestAnimationFrame(cycle);
}

function update() {
    player.move();
}

function render() {
    player.render();
}

function cycle(timestamp) {
    update();
    render();

    cycleTime = timestamp;
    window.requestAnimationFrame(cycle);
}

/*
function update(time) {
    player.move(time / fpsDelay);
}

function render() {
    player.render();
}

function cycle() {
    let now = Date.now();
    let time = now - cycleTime;

    update(time);
    render();

    let cycleDelay = fpsDelay;
    if (time > cycleDelay) {
        cycleDelay = Math.max(1, cycleDelay - (time - cycleDelay));
    }

    ctx.fillText(time, canvas.width - 50, canvas.height - 30);

    cycleTime = now;
    setTimeout(cycle, cycleDelay);
}*/