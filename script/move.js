document.onkeydown = function(event) {
    switch (event.keyCode) {
        /*w, arrow up*/
        case 87:
        case 38:
            player.move(0);
            break;

        /*s, arrow down*/
        case 83:
        case 40:
            player.move(180);
            break;

        /*a*/
        case 68:
            player.move(90);
            break;

        /*d*/
        case 65:
            player.move(270);
            break;
    }
};