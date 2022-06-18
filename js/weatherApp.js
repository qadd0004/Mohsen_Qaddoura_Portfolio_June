$(document).ready(function () {
    var degC = 0;

    var startPos;
    var geoOptions = {
        timeout: 10 * 1000
    }

    var geoSuccess = function (position) {
        // Modifying the url query with the correct geolocation of the user.
        startPos = position;
        var lat = startPos.coords.latitude;
        var lon = startPos.coords.longitude;
        var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&type=accurate&units=metric&appid=f8e98563fb175f445d4971e2998858b1"
        $.ajax(url, {
            // Immediately displays the recieved response of the API(JSON).
            success: function (response) {
                Display(response);
            },
            error: function (request, errorType, errorMessage) {
                alert('Error: ' + errorType + ' with message: ' + errorMessage);
            }
        });
    };
    setInterval(function () {
        $.ajax(url, {
            // Immediately displays the recieved response of the API(JSON).
            success: function (response) {
                Display(response);
            },
            error: function (request, errorType, errorMessage) {
                alert('Error: ' + errorType + ' with message: ' + errorMessage);
            }
        });
    }, 600000);
    // Indicates what went wrong if the location request failed.
    var geoError = function (error) {
        console.log('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out

    };

    // getting the user location 
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

    // Immediately displays the recieved response of the API
    function Display(response) {
        var windSpeed = (response.wind.speed * 1.85).toFixed(1);
        $('.temp span').text((response.main.temp).toFixed(1) + " C"); // as only one decimal is needed for the temprature
        $('.info .weather').html("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png' >" + " " + response.weather[0].description);
        // Capturing the temperature in centigrade after the AJAX request success.
        degC = parseFloat($(".temp span").text().slice(0, 4)).toFixed(1);
        $('.info .wind').text("wind speed  " + windSpeed + " km/h");
        $('.info .location').text(response.name + ", " + response.sys.country);
    }
    // Toggles between Centigrades and fahrenheit units for the temprature degrees after conversion (only to Fahrenheit is needed).			
    $("button").click(function () {
        $(".temp span").toggleClass("feh");
        if ($('.temp span').attr('class') == 'feh') {
            var degF = (degC * (9 / 5) + 32).toFixed(1);
            $(".temp span").text(degF + " F");
        } else {
            $(".temp span").text(degC + " C");
        }
    });
});