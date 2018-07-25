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
    player.turn(event.movementX / 2);
}