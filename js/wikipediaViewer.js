$(document).ready(function () {
    $('.search input').keyup(function () {
        var searchTerm = $('.search input').val();
        $.ajax({
            url: "https://en.wikipedia.org/w/api.php?",
            dataType: "jsonp",

            data: {
                action: 'query',
                generator: 'search',
                prop: 'extracts',
                exintro: '10',
                explaintext: '1',
                exsentences: '2',
                exlimit: '10',
                gsrsearch: searchTerm,
                format: 'json',
                gsrlimit: '10'
            },
            dataType: 'jsonp',

            success: function (x) {
                var result = "";

                function iterate(x) {
                    if ((typeof x === 'object') && (x !== null)) {
                        iterateObject(x);
                    } else {
                        if (typeof x == 'number') {
                            result += '<a href="http://en.wikipedia.org/?curid=' + x + '" target="_blank" class="more">Direct Link >></a>';
                        }
                    }
                }

                function iterateObject(obj) {
                    for (var key in obj) {
                        if (obj.hasOwnProperty(key) && key !== 'index' && key !== 'ns' && key !== 'gsroffset' && key !== 'continue') {
                            if (key === 'title') {
                                result += '<h3>' + obj[key] + '</h3>';
                            } else if (key === 'extract') {
                                result += '<p>' + obj[key] + '<p>';
                            } else {
                                iterate(obj[key]);
                            }
                        }
                    }
                    $('#article').html(result);
                }
                iterate(x);
            }
        });
    });
});