document.onkeydown = (event) => {
    let speed = 2;
    let turn = 2;

    switch (event.keyCode) {
        /*w, arrow up*/
        case 87:
        case 38:
            player.speed = speed;
            player.moveDirection = 0;
            break;

        /*s, arrow down*/
        case 83:
        case 40:
            player.speed = 3;
            player.moveDirection = 180;
            break;

        /*a*/
        case 68:
            player.speed = speed;
            player.moveDirection = 90;
            break;

        /*d*/
        case 65:
            player.speed = speed;
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