function checktouch() {
    if ('ontouchstart' in document.documentElement) {
        player.joystick = new Joystick();
        initializetouch();
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
function initializetouch() {
    document.getElementById("left").addEventListener("touchstart", touchstartMove, false);
    document.getElementById("left").addEventListener("touchmove", touchmoveMove, false);
    document.getElementById("left").addEventListener("touchend", touchendMove, false);
    document.getElementById("left").addEventListener("touchcancel", touchendMove, false);

    document.getElementById("right").addEventListener("touchstart", touchstartTurn, false);
    document.getElementById("right").addEventListener("touchmove", touchmoveTurn, false);
    document.getElementById("right").addEventListener("touchend", touchendTurn, false);
    document.getElementById("right").addEventListener("touchcancel", touchendTurn, false);
}

function touchstartMove(event) {
    let joystick = player.joystick;
    let x = event.touches[0].pageX / canvas.clientWidth * canvas.width;
    let y = event.touches[0].pageY / window.innerHeight * canvas.height;

    joystick.moveActive = true;
    joystick.moveX = x;
    joystick.moveY = y;
    joystick.moveSX = x;
    joystick.moveSY = y;
}

function touchmoveMove(event) {
    player.joystick.input(
        event.touches[0].pageX / canvas.clientWidth * canvas.width,
        event.touches[0].pageY / window.innerHeight * canvas.height,
        true
    );
}

function touchendMove() {
    player.joystick.moveActive = false;
    player.speed = 0;
}

function touchstartTurn(event) {
    let joystick = player.joystick;
    let x = event.touches[0].pageX / canvas.clientWidth * canvas.width;
    let y = event.touches[0].pageY / window.innerHeight * canvas.height;

    joystick.turnActive = true;
    joystick.turnX = x;
    joystick.turnY = y;
    joystick.turnSX = x;
    joystick.turnSY = y;
}

function touchmoveTurn(event) {
    player.joystick.input(
        event.touches[0].pageX / canvas.clientWidth * canvas.width,
        event.touches[0].pageY / window.innerHeight * canvas.height,
        false
    );
}

function touchendTurn() {
    player.joystick.turnActive = false;
    player.lookSpeed = 0;
    player.turnSpeed = 0;
}

