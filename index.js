import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import ejs from "ejs";

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

//To do 1: get pomodoro running 
//1a: A start button to get the time going for 25 minutes   DONE
//1b: be able to enter a time you'd like to work for. Buttons to increase/decrease by 5 minutes DONE
//1c: implement count up DONE
//1d: stop count down at 00 : 00    DONE
//1e: Add breaktime: can have the option of count up or count down break. DONE DID NOT DO COUNT UP BUT INSTEAD WILL IMPLEMENT NEGATIVE SIGN TO SEE HOW MUCH HAS ELAPSED AFTER TIME ENDED
//1f: change background colour depending on mode (pomodoro, short break, long break, infinite) DONE
//1g: Add buttons for short and long breaks DONE
//1h: Upon clicking reset, it adds two columns. First col, textbox to write summary of what was done. Second col, time elapsed. DONE
//1i: When time reaches 0 for all events except infinite, count up. DONE
//1j: Add sounds to the buttons DONE
//1k: Select alarm sound DONE
//1l: Play alarm when timer finish DONE
//1m: Delete summary row
//1m: When user selects sound, play sound until click on on outside of screen

///////////
//To do 2: Get quotes displayed  
//2a: change quote after 30 mins    DONE
//2b: Be able to interact with the quotes such as 
///////////

//To do 3: Interact with brain.fm that when you press play, you can listen to the songs
//3a: adjust volume
//To do 4: have meditation music when break time
///////////

//To do 5: use bootstrap or react to make it look nice

const url = "https://favqs.com/api/qotd"

app.get("/", async(req, res)=>{
    res.render('index.ejs', {quotes: 'Initial Quote'});
})

app.get("/get/quote", async(req, res)=>{
    const result = await (axios.get(url));
    res.json(result.data.quote.body);
    console.log(result.data.quote.body);
})

app.listen(port, ()=>{
    console.log(`You are listening to port ${port}`);
})