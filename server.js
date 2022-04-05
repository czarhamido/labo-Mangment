const express =require('express');
const app =express();
const cors =require("cors");
const axios=require("axios");
const mongoose =require('mongoose')
const gsm7 = require('gsm7');
const {Builder, By, Key, until} = require('selenium-webdriver');

function dec2hex(textString) {
	return (textString + 0).toString(16).toUpperCase();
}
function encodeMessage(textString) {
	var haut = 0;
	var result = '';
    if (!textString) return result;
	for ( var i = 0; i < textString.length; i++) {
		var b = textString.charCodeAt(i);
		if (haut != 0) {
			if (0xDC00 <= b && b <= 0xDFFF) {
				result += dec2hex(0x10000 + ((haut - 0xD800) << 10) + (b - 0xDC00));
				haut = 0;
				continue;
			} else {
				haut = 0;
			}
		}
		if (0xD800 <= b && b <= 0xDBFF) {
			haut = b;
		} else {
			cp = dec2hex(b);
			while (cp.length < 4) {
				cp = '0' + cp;
			}
			result += cp;
		}
	}
	return result;
}

mongoose.connect("mongodb+srv://labo:123456789abcd@labomain.lvvky.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));
app.use(cors({
  origin: "*",
})
);
app.use(express.json());

const ClinentRouter=require('./router/client');
app.use('/client',ClinentRouter);

const AnalyseRouter=require('./router/analyse');
app.use('/analyse',AnalyseRouter);




app.use(express.static('sysmangment/build'));
app.get("/",cors(),(req,res)=>{
    res.sendFile(`${__dirname}/sysmangment/build/index.html`);

})

app.get("/ana",cors(), (req,res)=>{
  res.sendFile(`${__dirname}/sysmangment/build/index.html`)

 
})

app.post("/sms",cors(),(req,res)=>{
  const SMSdata = `isTest=false&goformId=SEND_SMS&notCallback=true&Number=${req.body.number}&sms_time=12%3B03%3B11%3B23%3B19%3B00%3B%2B1&MessageBody=${encodeMessage(req.body.sms)}&ID=-1&encode_type=GSM7_default`;
  const config = {
    method: 'post',
    url: 'http://192.168.0.1/goform/goform_set_cmd_process',
 headers: { 
      'Connection': 'keep-alive', 
      'Pragma': 'no-cache', 
      'Cache-Control': 'no-cache', 
      'Accept': 'application/json, text/javascript, */*; q=0.01', 
      'X-Requested-With': 'XMLHttpRequest', 
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 
      'Origin': 'http://192.168.0.1', 
      'Referer': 'http://192.168.0.1/index.html', 
      'Accept-Language': 'en-US,en;q=0.9',
  
    },
    data : SMSdata

  };
  axios(config)
  .then(function (response) {
    console.log(response.data);


  })
  .catch(function (error) {
    console.log(error);
  });
  

});

app.listen(process.env.PORT || 5000,()=>{
  console.log("Server Started");
});