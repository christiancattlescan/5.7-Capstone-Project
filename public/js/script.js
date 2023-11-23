import * as time from "./pomodoro.js";
import * as quotes from "./quotes.js";

//Initial load page
time.pomodoroInit();
quotes.quoteInit();

//button sounds
$('button').click(function(){
    $('.buttonSound').get(0).play();
})
//Initial load page end

$('#start_timer').click(()=>{
    time.startTimer();
})

$('#stop_timer').click(()=>{
    time.stopTimer();
})

$('#chiptune').click(()=>{
    time.playAlarm();
    console.log('playing');
})

$('#oversimplified').click(()=>{
    time.playAlarm();
})

$('#digitalAlarm').click(()=>{
    time.playAlarm();
})

$('#shortAlarm').click(()=>{
    time.playAlarm();
})

$('#alarmClock').click(()=>{
    time.playAlarm();
})


//When Reset is pressed,
//it records time elapsed in col 2
//col 1: user can enter what they've done
$('#reset_button').click(()=>{
    time.resetTimer();
})

//Infinite button
$('#infinite').click(()=>{
    time.infiniteButton();
})

//count down button
$('#count_down').click(()=>{
    time.setAsCountDown();
})

$('#increase_time').click(()=>{
    time.increaseTime();
})

$('#decrease_time').click(()=>{
    time.decreaseTime();
})


//break buttons
$('#short_break').click(()=>{
    time.switchMode("shortBreak");
})

$('#long_break').click(()=>{
    time.switchMode("longBreak");
})

//Summary Table
time.deleteRowButton();