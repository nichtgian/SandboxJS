document.onkeydown = function(event) {
    switch (event.keyCode) {
        /*w key*/
        case 87:
        /*up arrow key*/
        case 38:
            player.move(0);
            break;

        /*s key*/
        case 83:
        /*down arrow key*/
        case 40:
            player.move(180);
            break;

        /*a key*/
        case 68:
            player.move(90);
            break;

        /*d key*/
        case 65:
            player.move(270);
            break;
    }
    player.render();
};