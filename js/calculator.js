$(function () {
    var screen = "",
        op = "";
    $(".calc-button, .function").on("click", function () {
        let btn = $(this).attr("name");

        // Register key input to the output on screen limiting the digits and entered to 17 inclduding decimal point and digits after it
        screen.length <= 11 ? (screen += btn) : screen;
        $(".screen").text(screen);
        if ("-+×÷".includes(btn)) {
            op = btn;
        }
    });

    // Evaluate all entered operations after replacing illegal characters withh legal JavaScript math operatos and uncessary equal sign from the screen grap
    $("#equal").on("click", function () {
        screen = $(".screen").text();
        screen = screen.replace(/=/g, "");
        screen = screen.replace(/×/g, "*");
        screen = screen.replace(/%/g, "/100");
        screen = screen.replace(/÷/g, "/");

        // This is basically the engine of the calculator
        let result = eval(screen);
        screen = result + "";
        screen = screen.length > 12 ? screen.slice(0, 12) : screen;
        // Finally displaying the result to the screen
        $(".screen").text(screen);
    });

    // Reset calculator
    $("#ac").on("click", function () {
        screen = "";
        $(".screen").text("0");
    });

    // Clears last typed number or operator
    $("#left-arr").on("click", function () {
        screen = $(".screen").text();
        screen = screen.slice(0, -1);
        $(".screen").text(screen);
    });

    //cancel last operation
    $("#ce").on("click", function () {
        screen = $(".screen").text();
        let operPos = screen.indexOf(op);
        screen = screen.slice(0, operPos);
        $(".screen").text(screen);
    });
});
