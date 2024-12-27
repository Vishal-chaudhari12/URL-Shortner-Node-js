const express=require("express")
require('dotenv').config();
const URL= require('./model/url')
const path = require('path');
const staticRoute =require('./routes/staticRouter')
// const shortId = req.params.shortId;



const {connectToMongoDB}= require("./connect");

const urlRoute= require("./routes/url");

const app=express()
const PORT=8002;

connectToMongoDB(`mongodb+srv://${process.env.Db_username}:${process.env.Db_pass}@cluster0.4bmfh.mongodb.net/db1?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => console.log("Database Connected!"))
  .catch((err) => console.log("Failed to connect", err));

 app.use(express.json());
 app.use(express.urlencoded({extended : false}));

//  app.get('/test',async(req,res)=>{
//   const allUrls= await URL.find({});
//   return res.render("home",{
//     urls : allUrls,
//   });
//  });
app.set("view engine","ejs");
app.set('views',path.resolve("./views"))

app.use("/url",urlRoute);
app.use("/",staticRoute);

app.get('/:shortId',async(req,res)=>{
  const shortId = req.params.shortId;
  const entry =await URL.findOneAndUpdate(
    {
    shortId,
  },
  {
    $push:{
      visitHistory:{
        timestamps:Date.now(),
      }
    },
  }
)
 res.required(entry.redirectURL);

})

app.listen(PORT,()=> console.log(`Server Started in ${PORT}`));