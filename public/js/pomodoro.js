let timer = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    // chosenTime: minutes, 
    clockRunning: false, //clock running if true - clock stopped if false
    timerEventList: {
        infinite: "infinite",
        pomodoro: "pomodoro",
        shortBreak: "shortBreak",
        longBreak: "longBreak",
    },
    remainingTime: {
        minutes: 25,
        seconds: 0,
    }
}

let myTimerInterval;
let myTimerEvent = "pomodoro";
let breakCounter = 3;
let passedSchedule = false;

function pomodoroInit(){
    // $('#summaryContainer').hide();
}

function startTimer(){
    if(timer.clockRunning){
        //If timer is in a state of running (true) then return
        return;
    }

    //Check which event is selected (default: countdown) then start timer
    switch(myTimerEvent){
        case timer.timerEventList.pomodoro:
        case timer.timerEventList.shortBreak:
        case timer.timerEventList.longBreak:
            myTimerInterval = setInterval(timerCountDownFunction, 1000);
            break;
        case timer.timerEventList.infinite:
            myTimerInterval = setInterval(timerCountUpFunction, 1000);
            break;
        default:
            console.log("cant start timer");
    }

    timer.clockRunning = true; //keep track of state of the clock
}

function stopTimer(){
    if(!timer.clockRunning){
        //If timer is in a state of stopped (false) then return
        return;
    }
    clearInterval(myTimerInterval);
    timer.clockRunning = false;
}

function playAlarm(){
    let alarmChoices = {
        chiptune: 'chiptune-alarm-clock-112869.mp3',
        oversimplified: 'oversimplified-alarm-clock-113180.mp3',
        digitalAlarm: 'digital-alarm-clock-151920.mp3',
        shortAlarm: 'alarm-clock-short-6402.mp3',
        alarmClock: 'clock-alarm-8762.mp3',
    }
    let alarmSelectedVal = $('#alarmSelection').val();
    let alarmSource = 'sounds/alarm/' + alarmChoices[alarmSelectedVal];
    $('.alarmSound').attr('src', alarmSource);
    $('.alarmSound').get(0).play();
}

function showSummaryTable(){
    $('#summaryContainer').show();
}

function getElapsedTime(){
    let elapsedMinute;
    let elapsedSecond;

    if (myTimerEvent === timer.timerEventList.infinite){
        elapsedMinute = timer.remainingTime.minutes;
        elapsedSecond = timer.remainingTime.seconds;
    }else{
        if(passedSchedule){
            elapsedMinute = timer[myTimerEvent] + timer.remainingTime.minutes;
            elapsedSecond = timer.remainingTime.seconds;
            passedSchedule = false;
        }else{
            elapsedMinute = Math.floor(((timer[myTimerEvent]*60) - (timer.remainingTime.minutes*60 + timer.remainingTime.seconds))/60);
            elapsedSecond = 60 - timer.remainingTime.seconds;
        }
    }
    return String(elapsedMinute).padStart(2, '0') + ':' + String(elapsedSecond).padStart(2, '0');
}

function deleteRowButton(){
    $('#summaryContainer').on("click",'#deleteRowButton',function(){
    
        $(this).closest('tr').remove(); 
        console.log($(this).closest('tr'));
     });
}

function insertRow(){
    let eventList = {
        infinite: "INFINITE",
        pomodoro: "POMODORO",
        shortBreak: "SHORT BREAK",
        longBreak: "LONG BREAK",
    }
    let table = $('#summaryTable');
    let typeCell = '<td>' + eventList[myTimerEvent] + '</td>';
    let summaryCell = '<td contenteditable="true"></td>';
    let timeCell ='<td>' + getElapsedTime() + '</td>' ;
    let actionCell = '<td><button id="deleteRowButton">Delete Row</button></td>';
    let markUp = '<tr>' + typeCell + summaryCell + timeCell + actionCell + '</tr>';
    table.append(markUp);
}

function resetTimer(){
    stopTimer();
    showSummaryTable();
    insertRow();
    switchMode(myTimerEvent); //resets clock value
}

function updateClock(){
    let timeValue = String(timer.remainingTime.minutes).padStart(2, '0') + ' : ' + String(timer.remainingTime.seconds).padStart(2, '0');
    if(passedSchedule){
        timeValue = '+ ' + timeValue;
    }
    $('#time_value').text(timeValue);
}

function switchMode (newEvent){
    myTimerEvent = newEvent;
    //switch from pomodoro time to break time or vice versa.
    switch(myTimerEvent){
        case timer.timerEventList.pomodoro:
            $('#count_down_buttons').show();
            $('#studyTitle').text("Study Time");
            $('body').css({"background-color":"#FBA1B7"});
            myTimerEvent = "pomodoro";
            timer.remainingTime.minutes = timer.pomodoro;
            timer.remainingTime.seconds = 0;
            updateClock();
            break;
        
        case timer.timerEventList.infinite:
            //infinite
            $('#count_down_buttons').hide();
            $('#studyTitle').text("Study Time");
            $('body').css({"background-color":"#FFDBAA"});
            myTimerEvent = "infinite";
            timer.remainingTime.minutes = 0;
            timer.remainingTime.seconds = 0;
            updateClock();
            break;
        
        case timer.timerEventList.shortBreak:
            $('#studyTitle').text("Quick Break");
            $('body').css({"background-color":"#C8E4B2"});
            myTimerEvent = timer.timerEventList.shortBreak;
            timer.remainingTime.minutes = timer.shortBreak;
            timer.remainingTime.seconds = 0;
            updateClock();
            break;

        case timer.timerEventList.longBreak:
            $('#studyTitle').text("Long Break time");
            $('body').css({"background-color":"#9ED2BE"});
            myTimerEvent = timer.timerEventList.longBreak;
            timer.remainingTime.minutes = timer.longBreak;
            timer.remainingTime.seconds = 0;
            updateClock();
            break;
        
        default:
            console.log("error in switching mode");
    }
}

function checkIfBreakTime(){
    stopTimer();
    //if the currentevent is pomodoro, add 1 to breakCounter, switch to shortBreak
    //if breakCounter == 3, switch to long break
    if(myTimerEvent != timer.timerEventList.pomodoro){
        switchMode(timer.timerEventList.pomodoro);
        return
    }

    if (breakCounter >= 3){
        switchMode(timer.timerEventList.longBreak);
        breakCounter = 0;
        return
    }

    breakCounter++;
    switchMode(timer.timerEventList.shortBreak);

}

function passedScheduleTimer(){
    passedSchedule = true;
    stopTimer();
    timer.clockRunning = true;
    myTimerInterval = setInterval(timerCountUpFunction, 1000);
}

function timerCountDownFunction(){
    timer.remainingTime.seconds--;
    if (timer.remainingTime.seconds <= 0){
        if(timer.remainingTime.minutes <= 0 && timer.remainingTime.seconds <= 0){
            // checkIfBreakTime();
            playAlarm();
            passedScheduleTimer();
        }else{
            timer.remainingTime.minutes--;
            timer.remainingTime.seconds = 59;
        }
    }    
    updateClock();
}

function timerCountUpFunction(){
    timer.remainingTime.seconds++;
    if (timer.remainingTime.seconds >= 60){
        timer.remainingTime.minutes++;
        timer.remainingTime.seconds = 0;
    }
    updateClock();
}

function infiniteButton(){
    stopTimer();
    switchMode("infinite");
}

function countDownButton(){
    stopTimer();
    switchMode("pomodoro");
}

//Handles increase and decrease time value by 5
function timeAdjust(setting){
    switchMode(myTimerEvent);   //reset time to original settings
    let timeSetting = setting;
    if (timeSetting === "increase"){
        //find which time user wants to adjust (pomodoro)
        timer[myTimerEvent] = timer[myTimerEvent] + 5;
        timer.remainingTime.minutes = timer[myTimerEvent];
    }else if(timeSetting === "decrease"){
        if(timer[myTimerEvent] <= 5){
            //do not decrease past 5 minutes
            return;
        }
        timer[myTimerEvent] = timer[myTimerEvent] - 5;
        timer.remainingTime.minutes = timer[myTimerEvent];
    }else{
        console.log("Error in adjusting time");
    }
    updateClock();
}

function increaseTime(){
    stopTimer();
    //Change either pomodoro, short break, long break
    //Adjust time
    timeAdjust("increase");
}

function decreaseTime(){
    stopTimer();
    //Change either pomodoro, short break, long break
    //Adjust time
    timeAdjust("decrease");
}
export {
    deleteRowButton,
    pomodoroInit, 
    startTimer, 
    stopTimer, 
    resetTimer, 
    playAlarm ,infiniteButton, increaseTime, decreaseTime, countDownButton as setAsCountDown, switchMode};