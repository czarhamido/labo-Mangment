const express =require('express');
const app =express();
const cors =require("cors")
const mongoose =require('mongoose')

mongoose.connect("mongodb+srv://labo:123456789abcd@labomain.lvvky.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));
app.use(cors());
app.use(express.json());

const ClinentRouter=require('./router/client');
app.use('/client',ClinentRouter);

const AnalyseRouter=require('./router/analyse');
app.use('/analyse',AnalyseRouter);




app.use(express.static('sysmangment/build'));
app.get("/",cors(),(req,res)=>{
    res.sendFile(`${__dirname}/sysmangment/build/index.html`)
})

app.get("/analyse",cors(),(req,res)=>{
  res.sendFile(`${__dirname}/sysmangment/build/index.html`)
})
  

app.listen(process.env.PORT || 5000,()=>{
  console.log("Server Started");
});