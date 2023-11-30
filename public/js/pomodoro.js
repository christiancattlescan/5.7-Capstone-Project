let timer = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    infinite: 0,
    startTime: 0,
    endTime: 0,
    clockRunning: false, //clock running if true - clock stopped if false
    timerEventList: {
        infinite: "infinite",
        pomodoro: "pomodoro",
        shortBreak: "shortBreak",
        longBreak: "longBreak",
    },
    remainingTime: {
        hours: 0,
        minutes: 25,
        seconds: 0,
    },
    totalStudyTime:{
        hours: 0,
        minutes: 0,
        seconds: 0,
    },
    totalBreakTime:{
        hours: 0,
        minutes: 0,
        seconds: 0,
    }
}

let myTimerInterval;
let myTimerEvent = "pomodoro";
let timeFinish = false;

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
            if (!timer.endTime){
                timer.endTime = new Date().getTime() + (timer[myTimerEvent] * 60 * 1000); 
            }else{
                timer.endTime = new Date().getTime() + (((timer.remainingTime.hours*60*60) + (timer.remainingTime.minutes*60) + (timer.remainingTime.seconds))*1000);
            }
            myTimerInterval = setInterval(timerCountDownFunction, 1000);
            break;
        case timer.timerEventList.infinite:
            if(!timer.startTime){
                timer.startTime = new Date().getTime();
            }else{
                timer.startTime = new Date().getTime() - (((timer.remainingTime.hours*60*60) + (timer.remainingTime.minutes*60) + (timer.remainingTime.seconds))*1000);
            }
            myTimerInterval = setInterval(timerCountUpFunction, 1000);
            break;
        default:
            console.log("cant start timer");
    }

    timer.clockRunning = true; //keep track of state of the clock
}

function stopButton(){
    if(!timer.clockRunning){
        //If timer is in a state of stopped (false) then return
        return;
    }
    stopTimer();
    stopAlarm();                    //stop alarm
}

function stopTimer(){
    clearInterval(myTimerInterval); //stops clock
    myTimerInterval = null;         //clear interval variable
    timer.clockRunning = false;     //clock flag to false
}

function clearStartEndTime(){
    timer.startTime = 0;
    timer.endTime = 0;
}

function addTotalTime(){

    let totalPrevTime;
    let totalTime;
    let currentTimeHour = parseInt(getElapsedTime().split(':')[0]);
    let currentTimeMinute = parseInt(getElapsedTime().split(':')[1]);
    let currentTimeSeconds = parseInt(getElapsedTime().split(':')[2]);
    let totalCurrTime = (currentTimeHour * 60 * 60) + (currentTimeMinute * 60) + (currentTimeSeconds);   

    if(myTimerEvent === timer.timerEventList.infinite || myTimerEvent === timer.timerEventList.pomodoro){
        totalPrevTime = (timer.totalStudyTime.hours * 60 * 60) + (timer.totalStudyTime.minutes * 60) + (timer.totalStudyTime.seconds);
        totalTime = totalCurrTime + totalPrevTime;
        timer.totalStudyTime.hours = Math.floor((totalTime / 60) / 60);
        timer.totalStudyTime.minutes = Math.floor((totalTime / 60) % 60);
        timer.totalStudyTime.seconds = totalTime % 60;
    }else{
        totalPrevTime = (timer.totalBreakTime.hours * 60 * 60) + (timer.totalBreakTime.minutes * 60) + (timer.totalBreakTime.seconds);
        totalTime = totalCurrTime + totalPrevTime;
        timer.totalBreakTime.hours = Math.floor((totalTime / 60) / 60);
        timer.totalBreakTime.minutes = Math.floor((totalTime / 60) % 60);
        timer.totalBreakTime.seconds = totalTime % 60;
    }  
    // console.log(`Hour: ${timer.totalStudyTime.hours}, Minute: ${timer.totalStudyTime.minutes}, Seconds: ${timer.totalStudyTime.seconds}`);
}

function displayTotalTime(){
    $('#studiedHours').text(timer.totalStudyTime.hours);
    $('#studiedMinutes').text(timer.totalStudyTime.minutes);
    $('#studiedSeconds').text(timer.totalStudyTime.seconds);
    $('#breakHours').text(timer.totalBreakTime.hours);
    $('#breakMinutes').text(timer.totalBreakTime.minutes);
    $('#breakSeconds').text(timer.totalBreakTime.seconds);
 
}

function resetButton(){
    stopButton();
    insertRow();
    addTotalTime();
    resetTimer();
    updateClock();
    displayTotalTime();
}

function resetTimer(){
    clearStartEndTime();
    resetRemainingTime();
}

function stopAlarm(){
    $('.alarmSound').get(0).pause();
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

function getElapsedTime(){
    let elapsedHour;
    let elapsedMinute;
    let elapsedSecond;

    if (myTimerEvent === timer.timerEventList.infinite){
        elapsedHour = timer.remainingTime.hours;
        elapsedMinute = timer.remainingTime.minutes;
        elapsedSecond = timer.remainingTime.seconds;
    }else{
        if(timeFinish){
            let totalTime = timer[myTimerEvent] + timer.remainingTime.minutes + Math.floor(timer.remainingTime.hours*60);
            elapsedHour = Math.floor(totalTime/60);
            elapsedMinute = totalTime % 60;
            elapsedSecond = timer.remainingTime.seconds;
            timeFinish = false;
        }else{
            let remainingTime = (timer.remainingTime.hours * 60 * 60)+(timer.remainingTime.minutes*60) + timer.remainingTime.seconds;
            elapsedHour = Math.floor((((timer[myTimerEvent] * 60)-remainingTime)/60)/60);
            elapsedMinute = Math.floor(((timer[myTimerEvent] * 60)-remainingTime)/60);
            elapsedSecond = ((timer[myTimerEvent] * 60) - remainingTime)%60;
        }
    }
    return String(elapsedHour).padStart(2, '0') + ':' + String(elapsedMinute).padStart(2, '0') + ':' + String(elapsedSecond).padStart(2, '0');
}

function deleteRowButton(){
    $('#summaryContainer').on("click",'#deleteRowButton',function(){
        $(this).closest('tr').remove(); 
     });
}

function getBackgroundColor(){
    switch(myTimerEvent){
        case timer.timerEventList.pomodoro:
            return "background-color: #FBA1B7";
            break;
        
        case timer.timerEventList.infinite:
            //infinite
            return "background-color: #FFDBAA";
            break;
        
        case timer.timerEventList.shortBreak:
            return "background-color: #C8E4B2"
            break;

        case timer.timerEventList.longBreak:
            return "background-color: #9ED2BE";
            break;
        
        default:
            console.log("error in getting background color");
    }
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
    let actionCell = '<td><button id="deleteRowButton">Delete</button></td>';
    let markUp = '<tr style= "' + getBackgroundColor() +'" >' + typeCell + summaryCell + timeCell + actionCell + '</tr>';
    table.append(markUp);
}

function updateClock(){
    
    let timeValue = String(timer.remainingTime.minutes).padStart(2, '0') + ' : ' + String(timer.remainingTime.seconds).padStart(2, '0');
    if(timer.remainingTime.hours >= 1 ){
        timeValue = String(timer.remainingTime.hours).padStart(2, '0')  + ' : ' + timeValue;
    }
    if(timeFinish){
        timeValue = ' + ' + timeValue;
    }
    $('#time_value').text(timeValue);
}

function resetRemainingTime(){
    timer.remainingTime.hours = Math.floor(timer[myTimerEvent]/60);
    timer.remainingTime.minutes = timer[myTimerEvent]%60;
    timer.remainingTime.seconds = 0;
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
            break;
        
        case timer.timerEventList.infinite:
            //infinite
            $('#count_down_buttons').hide();
            $('#studyTitle').text("Study Time");
            $('body').css({"background-color":"#FFDBAA"});
            myTimerEvent = "infinite";
            break;
        
        case timer.timerEventList.shortBreak:
            $('#count_down_buttons').show();
            $('#studyTitle').text("Quick Break");
            $('body').css({"background-color":"#C8E4B2"});
            myTimerEvent = timer.timerEventList.shortBreak;
            break;

        case timer.timerEventList.longBreak:
            $('#count_down_buttons').show();
            $('#studyTitle').text("Long Break time");
            $('body').css({"background-color":"#9ED2BE"});
            myTimerEvent = timer.timerEventList.longBreak;
            break;
        
        default:
            console.log("error in switching mode");
    }
    stopButton();
    clearStartEndTime();
    resetRemainingTime();
    updateClock();
}

function timeDone(){
    stopTimer();
    playAlarm();
    timeFinish = true;
    resetRemainingTime();
    timer.clockRunning = true;
    timer.startTime = new Date().getTime();
    myTimerInterval = setInterval(timerCountUpFunction, 1000);
}

function timerCountDownFunction(){
    //check if endTime === start time. If so, timer done
    //if not, update remaining minutes and seconds
    let elapsedTime = timer.endTime - new Date().getTime();  //in milliseconds
    timer.remainingTime.hours = Math.floor(((elapsedTime / 1000) / 60) / 60);
    timer.remainingTime.minutes = Math.floor(((elapsedTime / 1000) / 60) % 60);
    timer.remainingTime.seconds = Math.round(elapsedTime / 1000) % 60;
    updateClock();
    // console.log(elapsedTime);
    if ((Math.round(elapsedTime/1000)) <= 0){
        timeDone();
        return
    }
}

function timerCountUpFunction(){
    let currentTime = new Date().getTime();
    let elapsedTime = currentTime - timer.startTime;
    timer.remainingTime.hours = Math.floor(((elapsedTime / 1000) / 60) / 60);
    timer.remainingTime.minutes = Math.floor((elapsedTime / 1000) / 60) % 60;
    timer.remainingTime.seconds = Math.floor((elapsedTime / 1000) % 60);
    updateClock();
}

function infiniteButton(){
    stopButton();
    switchMode("infinite");
}

function pomodoroModeButton(){
    stopButton();
    switchMode("pomodoro");
}

//Handles increase and decrease time value by 5
function timeAdjust(setting){
    // switchMode(myTimerEvent);   //reset time to original settings
    let timeSetting = setting;
    if (timeSetting === "increase"){
        //find which time user wants to adjust (pomodoro)
        timer[myTimerEvent] = timer[myTimerEvent] + 5;
       
    }else if(timeSetting === "decrease"){
        if(timer[myTimerEvent] <= 5){
            //do not decrease past 5 minutes
            updateClock();
            return;
        }
        timer[myTimerEvent] = timer[myTimerEvent] - 5;

    }else{
        console.log("Error in adjusting time");
    }   

    resetRemainingTime();
    updateClock();
}

function increaseTime(){
    stopButton();
    clearStartEndTime();
    //Change either pomodoro, short break, long break
    //Adjust time
    timeAdjust("increase");
}

function decreaseTime(){
    stopButton();
    clearStartEndTime();
    resetRemainingTime();
    //Change either pomodoro, short break, long break
    //Adjust time
    timeAdjust("decrease");
}
export {
    deleteRowButton, 
    startTimer, 
    stopButton as stopTimer, 
    resetButton as resetTimer, 
    playAlarm ,
    infiniteButton, 
    increaseTime, 
    decreaseTime, 
    pomodoroModeButton as setAsCountDown, 
    switchMode
};