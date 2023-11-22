import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3001;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Example for Express.js
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const url = "https://favqs.com/api/qotd"
// const url_random_api = "random"

app.get("/", async(req, res)=>{
    const result = await (axios.get(url));
    res.json(result.data.quote.body);
    console.log(result.data.quote.body);
})

app.listen(port, ()=>{
    console.log(`You are listening to port ${port}`);
})