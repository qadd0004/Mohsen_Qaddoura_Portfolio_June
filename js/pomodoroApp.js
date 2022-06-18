$(document).ready(function () {
    var breakInMinutes = +$('.break').text();
    var intervalInMinutes = +$('.session').text();
    var stopped = false;
    var running = false;
    var sessionTimeOut = false;
    var breakTimeOut = false;

    $('.start, .stop').dblclick(function (e) {
        e.preventDefault();
    });

    $('#addMinsSession').on('click', function () {
        if (!running) {
            intervalInMinutes += 1;
            $('#indicator h2').text('Session');
            $('.session').text(intervalInMinutes);
            $('.minutes').text(intervalInMinutes);
            $('.seconds').text('00');
        }
    });

    $('#subtractMinsSession').on('click', function () {
        if (!running && intervalInMinutes > 1) {
            intervalInMinutes -= 1;
            $('#indicator h2').text('Session');
            $('.session').text(intervalInMinutes);
            $('.minutes').text(intervalInMinutes);
            $('.seconds').text('00');
        }
    });

    $('#addMinsBreak').on('click', function () {
        if (!running) {
            breakInMinutes += 1;
            $('.break').text(breakInMinutes);
            return breakInMinutes;
        }
    });

    $('#subtractMinsBreak').on('click', function () {
        if (!running && breakInMinutes > 1) {
            breakInMinutes -= 1;
            $('.break').text(breakInMinutes);
            return breakInMinutes;
        }
    });

    function showProgress(color, mins) {
        // Reset width variables and CSS styles
        clearInterval(move);
        var elementWidth = 0;
        var width = 0;
        $('.bar').css('width', 0 + '%');
        $('.bar').css('background-color', color);

        elementWidth = $('.progress').css('width');
        // slicing the 'px' out of the returned elementWidth.
        elementWidth = Number(elementWidth.slice(0, elementWidth.length - 2));

        var move = setInterval(advance, 1000); // setting up a timer for showning the progress / advance of timer

        function advance() {
            if (width >= 100 || stopped) {
                clearInterval(move);
                width = 0;
                elementWidth = 0;
                $('.bar').css('width', 0 + '%');
            } else if (!stopped) {
                // Incrementing the bar width by a proportional amount in percentage of the full width per second to the minutes
                width += (elementWidth / (mins * 60)) / elementWidth * 100;
                console.log(width);
                $('.bar').css('width', width + '%');
            }
        }
    }

    function getRemainingTime(finishTime) {
        var t = Date.parse(finishTime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / (1000 * 60)) % 60);
        return {
            'minutes': minutes,
            'seconds': seconds,
            'total': t
        };
    }

    function setTimer(finishTime) {
        // This function does all the heavey lifting for the operation of the timers plus stopping them.
        running = true;
        var minutesDisplay = $('.minutes');
        var secondsDisplay = $('.seconds');

        function updateTimer() {
            var t = getRemainingTime(finishTime);
            minutesDisplay.text(('0' + t.minutes).slice(-2));
            secondsDisplay.text(('0' + t.seconds).slice(-2));

            if (t.total <= 0) {
                clearInterval(timeinterval);
                running = false;
                var sound = "http://freesound.org/data/previews/481/481792_9497060-lq.mp3";
                var intervalEnd = new Audio(sound);
                intervalEnd.play();
                // This is where the continous toggling between Break and Session timers is variable setup.
                if (!sessionTimeOut) {
                    sessionTimeOut = true;
                    breakTimeOut = false;
                    timeOut();
                } else {
                    sessionTimeOut = false;
                    breakTimeOut = true;
                    timeOut();
                }
            }
        }
        updateTimer();

        var timeinterval = setInterval(updateTimer, 1000); // setting the main timer and determining the momental intervals of its peroidical update.

        $('.stop').on('click', function () {
            stopped = true;
            if (stopped) {
                clearInterval(timeinterval);
                running = false;
                sessionTimeOut = false;
                breakTimeOut = true;
            }
        });
    }

    function resetTimer(minutes) {
        running = true;
        currentTime = Date.parse(new Date());
        var setTime = new Date(currentTime + minutes * 60 * 1000);
        setTimer(setTime);
    }

    function timeOut() {
        // This function does the actual toggling between the two timers when they end
        if (sessionTimeOut && !breakTimeOut) {
            $('#indicator h2').text('Break');
            showProgress('grey', breakInMinutes);
            resetTimer(breakInMinutes);
        } else if (!sessionTimeOut && breakTimeOut) {
            $('#indicator h2').text('Session');
            showProgress('#FFF', intervalInMinutes)
            resetTimer(intervalInMinutes);
        }
    }

    $('.start').on('click', function () {
        stopped = false;
        if (!running) {
            running = true;
            $('#indicator h2').text('Session');
            showProgress('#FFF', intervalInMinutes);
            resetTimer(intervalInMinutes);
        }
    });
});