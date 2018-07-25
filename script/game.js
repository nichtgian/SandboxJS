let player = null;
let cycleTime = Date.now();

let stats = new Stats();
stats.showPanel(0);
stats.dom.style.marginTop = "10px";
stats.dom.style.marginLeft = "260px";
document.body.appendChild(stats.dom);

function start() {
    player = new Player(425, 325, 0, texture);
    cycle();
}

function update() {
    player.move();
}

function render() {
    player.render();
}

function cycle() {
    stats.begin();

    update();
    render();

    let now = Date.now();
    let dt = (now - cycleTime) / (1000 / 30);
    //console.log((now - cycleTime), dt);
    cycleTime = now;

    stats.end();
    setTimeout(cycle, dt);
}
