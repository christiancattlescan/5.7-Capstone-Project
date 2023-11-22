// import axios from "axios";
//Change quotes every 5 minutes
let myQuoteInterval;
const url = "http://localhost:3000/get/quote";

async function fetchQuote(){
    const result = await (axios.get(url));
    // console.log(result.data);
    let text = '"' +  result.data + '"';
    $('#quoteHeading').text(text);
    runQuoteInterval(600000);
}

function runQuoteInterval(time){
    myQuoteInterval = setInterval(fetchQuote, time);
}

export {
    fetchQuote,
};



