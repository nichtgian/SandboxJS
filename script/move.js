document.onkeydown = (event) => {
    let forwardSpeed = 1;
    let backSpeed = 0.75;
    let turn = 2;

    switch (event.keyCode) {
        /*w, arrow up*/
        case 87:
        case 38:
            player.speed = forwardSpeed;
            player.moveDirection = 0;
            break;

        /*s, arrow down*/
        case 83:
        case 40:
            player.speed = backSpeed;
            player.moveDirection = 180;
            break;

        /*a*/
        case 68:
            player.speed = backSpeed;
            player.moveDirection = 90;
            break;

        /*d*/
        case 65:
            player.speed = backSpeed;
            player.moveDirection = 270;
            break;

        /*q*/
        case 81:
            player.turnSpeed = -turn;
            break;

        /*e*/
        case 69:
            player.turnSpeed = turn;
            break;
    }
};

document.onkeyup = (event) => {
    switch (event.keyCode) {
        /*w, arrow up*/
        case 87:
        case 38:
        /*s, arrow down*/
        case 83:
        case 40:
        /*a*/
        case 68:
        /*d*/
        case 65:
            player.speed = 0;
            break;

        /*q & e*/
        case 81:
        case 69:
            player.turnSpeed = 0;
            break;
    }
};

document.onmousedown = function (event) {
    //console.log(event)
};