import * as time from "./pomodoro.js";

//Initial load page
$('#count_down_buttons').hide();
//Initial load page end

$('#start_timer').click(()=>{
    time.startTimer();
})

$('#stop_timer').click(()=>{
    time.stopTimer();
})

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