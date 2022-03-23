const express = require('express'); 
const path = require('path');
const https = require('https');

const app = express();

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.use('/static',express.static('static'));

const url = 'https://api.adviceslip.com/advice';

let adviceData;
let id;
let advice;
function get_advice(){
https.get(url,(response)=>{
  response.on('data',(data)=>{
    adviceData = JSON.parse(data);
    id = adviceData.slip.id;
    advice = adviceData.slip.advice;

  });
});
}

get_advice();
app.get('/',(req,res)=>{
  res.render('demo',{'id':id,'advice':`"${advice}"`});
});

app.post('/',(req,res)=>{
  get_advice();
  res.render('demo',{'id':id,'advice':`"${advice}"`});
});
  

app.listen(process.env.PORT||80,()=>{
  console.log('server is running');
})