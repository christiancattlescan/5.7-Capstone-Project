let minutes = 25;    
let seconds = 0;
let startingTime = minutes;
let myTimer = 0;
let timerState = false; //running if true - stopped if false
const timerEventList = {
    countUp: "count up",
    countDown: "count down"
}

let myTimerEvent = "count down";

function combineMinuteSeconds(){
    // let secondStrings = '';
    // let minuteStrings = '';
    // if (seconds < 10){
    //     secondStrings = '0' + seconds;
    // }else{
    //     secondStrings = String(seconds);
    // }
    // if(minutes < 10){
    //     minuteStrings = '0' + minutes;
    // }else{
    //     minuteStrings = String(minutes);
    // }

    // return minuteStrings+" : "+secondStrings;
    return String(minutes).padStart(2, '0') + ' : ' + String(seconds).padStart(2, '0');
    
}

function timerCountDownFunction(){
    seconds--;
    if(minutes < 1 && seconds < 1){
        stopTimer();
        $('#time_value').text(combineMinuteSeconds());
        $('#studyTitle').text("Break time");
        return
    }
    if (seconds < 0){
        minutes--;
        seconds = 59;
    }
    $('#time_value').text(combineMinuteSeconds());
}

function timerCountUpFunction(){
    seconds++;
    if (seconds > 60){
        minutes++;
        seconds = 0;
    }
    $('#time_value').text(combineMinuteSeconds());
}

function stopTimer(){
    if(!timerState){
        return;
    }
    clearInterval(myTimer);
    timerState = false;
}

function startTimer(){
    if(timerState){
        return;
    }
    if(myTimerEvent === timerEventList.countDown){
        myTimer = setInterval(timerCountDownFunction, 1000);
    }else if(myTimerEvent === timerEventList.countUp){
        myTimer = setInterval(timerCountUpFunction, 1000);
    }
    timerState = true;
}

function resetTimer(){
    minutes = startingTime;
    seconds = 0;
    stopTimer();
    $('#time_value').text(combineMinuteSeconds());
}

function infiniteButton(){
    stopTimer();
    myTimerEvent = "count up";
    $('#count_down_buttons').hide();
    startingTime = 0;
    minutes = startingTime;
    seconds = 0;
    $('#time_value').text(combineMinuteSeconds());
}

function setAsCountDown(){
    stopTimer();
    myTimerEvent = "count down";
    startingTime = 25;
    minutes = startingTime;
    seconds = 0;
    $('#count_down_buttons').show();
    $('#time_value').text(combineMinuteSeconds());
}

function increaseTime(){
    stopTimer();
    seconds = 0;
    if(minutes != startingTime){
        minutes = startingTime;
    }
    startingTime = minutes + 5;
    minutes = startingTime;
    $('#time_value').text(combineMinuteSeconds());
}

function decreaseTime(){
    stopTimer();
    seconds = 0;
    if(minutes != startingTime){
        minutes = startingTime;
    }
    if(minutes <= 5){
        // minute = startingTime;
        $('#time_value').text(combineMinuteSeconds());
        return;
    }
    startingTime = minutes - 5;
    minutes = startingTime;
    $('#time_value').text(combineMinuteSeconds());
}
export {startTimer, stopTimer, resetTimer, infiniteButton, increaseTime, decreaseTime, setAsCountDown};