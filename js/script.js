var iniMinutes = 0;
var counter = 0;
var interval;
var element;

/* Controls */

// Start
$('#start').on('click', function() {
    $('#form').slideUp('fast');
    $('#working').slideDown('fast');

    var minutes = $('#minutes').val();

    startCounter(minutes, $('#counter'));
});

// Clear
$('#clear').on('click', function() {
    $('#working').slideUp('fast');
    $('#form').slideDown('fast');
    stopCounter();
});

// Stop
$('#stop').on('click', function() {
    if($('#stop').html().substring(0, 4) == "STOP") {
        // Change font color
        $('#counter').addClass('red-text');
        $('#counter').addClass('text-darken-1');

        // Change button text
        $('#stop').html('Continue');

        // Stop the counter
        stopCounter();

    } else {
        // Change font color
        $('#counter').removeClass('red-text');
        $('#counter').removeClass('text-darken-1');

        // Change button text
        $('#stop').html('STOP');

        // Continue the counter
        continueCounter();
    }
});

/* Counter */

// Start
function startCounter(minutes, myElement) {
    iniMinutes = minutes;
    counter = minutes * 60;
    element = myElement

    element.html(minutes + ":00");

    interval = setInterval(function() {
        updateCounter();
    }, 1000);
}

// Stop
function stopCounter() {
    clearInterval(interval);
}

// Continue
function continueCounter() {
    //console.log(counter);
    interval = setInterval(function() {
        updateCounter(element);
    }, 1000);
}

// Update
function updateCounter() {
    if(counter > 0) {
        counter--;
        console.log(counter);

        var mins = minutes();
        var secs = seconds();

        if(secs < 10) {
            secs = "0"+secs;
        }

        var showTime = mins + ':' + secs;
        
        checkTime();
        element.html(showTime);
    } else {
        stopCounter();
    }
}

// Get Minutes
function minutes() {
    var mins = counter / 60;
    return parseInt(mins);
}

// Get Seconds
function seconds() {
    var min = minutes();
    var secs = counter - ( 60 * min);
    return parseInt(secs);
}

/* Time comprobations */

function checkTime() {

    var mins = minutes();
    var secs = seconds();

    // Minute elapsed alert
    if(secs == 0) {
        minuteAlert(mins);
    }

    // Thirty seconds left alert
    if(mins == 0 && secs == 30) {
        timeoutAlert();
    }

    if(mins == 0 && secs <= 5) {
        lastAlert(secs);
    }
}

function minuteAlert(minutes) {
    vibrations = iniMinutes - minutes;

    for (var i = 0; i < minutes; i++) {
        navigator.vibrate(1000);
    };

    console.log(" ALERTA: " + vibrations);
}

function timeoutAlert() {
    console.log(" ALERTA: TREINTA SEGUNDOS");
    navigator.vibrate(0200);
    navigator.vibrate(0200);
    navigator.vibrate(0200);
}

function lastAlert(seconds) {
    console.log(" ALERTA: QUEDAN " + seconds + " SEGUNDOS");
    for (var i = 6 - seconds; i >= 0; i--) {
        navigator.vibrate(0200);
    };
}