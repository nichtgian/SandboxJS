let player = null;
let cycleTime = Date.now();

let stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

function start() {
    player = new Player(375, 325, 0, texture);
    checktouch();
    window.requestAnimationFrame(cycle);
}

function update(dt) {
    player.update(dt);
}

function render() {
    player.render();
}

function cycle(timestamp) {
    stats.begin();
    let dt = timestamp - cycleTime;

    update(dt);
    render();

    cycleTime = timestamp;
    stats.end();

    window.requestAnimationFrame(cycle);
}
