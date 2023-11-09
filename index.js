import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import ejs from "ejs";

const app = express();
const port = 3000;

app.use(express.static('public'));

//To do 1: get pomodoro running 
//1a: A start button to get the time going for 25 minutes   DONE
//1b: be able to enter a time you'd like to work for. Buttons to increase/decrease by 5 minutes DONE
//1c: implement count up DONE
//1d: stop count down at 00 : 00    DONE
//1e: Add breaktime: can have the option of count up or count down break. 
//1e: Add sounds to the buttons
///////////
//To do 2: Get random quotes displayed 
//2a: change quote after 15 seconds
//To do 3: Interact with brain.fm that when you press play, you can listen to the songs
//3a: adjust volume
//To do 4: have meditation music when break time



app.get("/", (req, res)=>{
    res.render('index.ejs');
})

app.listen(port, ()=>{
    console.log(`You are listening to port ${port}`);
})