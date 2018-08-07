function checktouch() {
    if ('ontouchstart' in document.documentElement) {
        player.joystick = new Joystick();
        document.addEventListener("touchstart", touchstart, false);
        document.addEventListener("touchmove", touchmove, false);
        document.addEventListener("touchend", touchend, false);
        document.addEventListener("touchcancel", touchend, false);
    }
    else {
        document.addEventListener('pointerlockchange', lockChangeLog, false);
        canvas.onclick = function() {
            canvas.requestPointerLock();
        };
    }
}

/*desktop*/
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


/*mobile*/
function touchstart(event) {
    let joystick = player.joystick;
    let x = event.touches[0].pageX / canvas.clientWidth * canvas.width;
    let y = event.touches[0].pageY / window.innerHeight * canvas.height;
    joystick.active = true;
    joystick.x = x;
    joystick.y = y;
    joystick.stickX = x;
    joystick.stickY = y;
}

function touchmove() {
    player.joystick.moveStick(
        event.touches[0].pageX / canvas.clientWidth * canvas.width,
        event.touches[0].pageY / window.innerHeight * canvas.height
    );
}

function touchend() {
    player.joystick.active = false;
    player.speed = 0;
    player.turnSpeed = 0;
}
