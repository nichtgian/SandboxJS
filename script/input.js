document.addEventListener('pointerlockchange', lockChangeLog, false);

canvas.onclick = function() {
    canvas.requestPointerLock();
};

function lockChangeLog() {
    if (document.pointerLockElement === canvas) {
        document.addEventListener("mousemove", mousemoveCallback, false);
    }
    else {
        document.removeEventListener("mousemove", mousemoveCallback, false);
    }
}

function mousemoveCallback(event) {
    let sensitivityX = 1;
    let sensitivityY = 4;
    player.turn(event.movementX / sensitivityX, (-event.movementY) * sensitivityY);
}