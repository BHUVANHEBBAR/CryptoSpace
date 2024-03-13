import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
//app 
const app = express();
const port = 3000;

//apiurl
const apiUrl = "https://api.mobula.io/api/1/market/data?symbol=";

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

let coinofchoice = "BTC";

app.get('/', async (req, res) => {
    try{
        const coinview = await axios.get(apiUrl+coinofchoice);
        res.render("index.ejs",{data: JSON.stringify(coinview.data.data.price)});
    }
    catch(error){
        console.log(error);
    }
    
});

app.post('/get-price', async (req, res) => {
    coinofchoice = req.body.coin;
try{
    const coinview = await axios.get(apiUrl+coinofchoice);
        res.render("index.ejs",{data: coinview.data.data});
}
catch(error){
    console.log(error);
}

});

app.listen(port,()=>{
    console.log("Listening on port",port);
});