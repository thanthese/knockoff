// To start skewer mode: `httpd-start` and open page in browser.

// coordinates: (row, col), with (0, 0) in the upper left

var settings = {
    board: {
        width: 20,
        height: 20
    }
};

var board = {
    player: {
        x: 0,
        y: 0
    }
};

function setup() {
    // reset state
    $("#game").html("");

    // build grid
    for (var y = 0; y < settings.board.height; y++) {
        var row = $(".templates .row").clone().appendTo("#game");
        for (var x = 0; x < settings.board.width; x++) {
            $(".templates .cell")
                .clone()
                .text(_.sample("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.;"))
                .attr("id", "cell-" + y + "-" + x)
                .appendTo(row);
        }
    }

    // randomly populate
    $(".cell").text(".");
    for (var i = 0; i < 80; ++i) {
        var x = _.random(0, settings.board.width);
        var y = _.random(0, settings.board.height);
        $("#cell-" + x + "-" + y).text(_.sample("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.;"));
    }

    // add player
    $("#cell-" + board.player.x + "-" + board.player.y).text("@");

    // listen for keyboard
    $(document).keypress(onkey);
}

function onkey(event) {
    switch (event.which) {
        case "j".charCodeAt():
            movePlayer(1, 0);
            break;
        case "k".charCodeAt():
            movePlayer(-1, 0);
            break;
        case "h".charCodeAt():
            movePlayer(0, -1);
            break;
        case "l".charCodeAt():
            movePlayer(0, 1);
            break;
    }
}

function movePlayer(deltaRow, deltaCol) {
    $("#cell-" + board.player.y + "-" + board.player.x).text(".");
    board.player.y += deltaRow;
    board.player.x += deltaCol;
    $("#cell-" + board.player.y + "-" + board.player.x).text("@");
}

$(setup);