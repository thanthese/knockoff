// To start skewer mode: `httpd-start` and open page in browser.

// coordinates: (x, y), lower left is (0, 0)

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
    for (var y = settings.board.height - 1; y >= 0; y--) {
        var row = $(".templates .row").clone().appendTo("#game");
        for (var x = 0; x < settings.board.width; x++) {
            $(".templates .cell")
                .clone()
                .text(_.sample("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.;"))
                .attr("id", getPixelId(x, y))
                .appendTo(row);
        }
    }

    // randomly populate
    $(".cell").text(".");
    for (var i = 0; i < 80; ++i) {
        var x = _.random(0, settings.board.width);
        var y = _.random(0, settings.board.height);
        getPixel(x, y).text(_.sample("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.;"));
    }

    // add player
    getPixel(board.player.x, board.player.y).text("@");

    // listen for keyboard
    $(document).keypress(onkey);

    $(".cell").addClass("blueBackground");
}

function onkey(event) {
    function k(ch) {
        return event.which == ch.charCodeAt();
    }

    if (k("j")) return movePlayer(0, -1);
    if (k("k")) return movePlayer(0, 1);
    if (k("h")) return movePlayer(-1, 0);
    if (k("l")) return movePlayer(1, 0);

    if (k("y")) return movePlayer(-1, 1);
    if (k("u")) return movePlayer(1, 1);
    if (k("b")) return movePlayer(-1, -1);
    if (k("n")) return movePlayer(1, -1);
}

function movePlayer(deltaX, deltaY) {
    getPixel(board.player.x, board.player.y).text(".");
    board.player.x += deltaX;
    board.player.y += deltaY;
    getPixel(board.player.x, board.player.y).text("@");
    randomlyChangeBackground();
}

var last = true;
function randomlyChangeBackground() {

    var background = "";
    if(last == true) {
        last = false;
        background="blueBackground";
    } else {
        last = true;
        background="redBackground";
    }


    $(".cell").toggleClass("blueBackground");
    $(".cell").toggleClass("redBackground");

}

function getPixelId(x, y) {
    return "pixel-" + x + "-" + y;
}

function getPixel(x, y) {
    return $("#" + getPixelId(x, y));
}

$(setup);
