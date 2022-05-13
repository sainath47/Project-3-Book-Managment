const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const route = require("./route/route.js");

// app.get('/homepage',function(req,res){
//     res.send({msg:"namastey sir"})
// })

app.use(bodyParser.json()); //whatever coming inside request it is converting into json
app.use(bodyParser.urlencoded({ extended: true })); // parses data coming from html form




mongoose
  .connect(
    "mongodb+srv://itstheanurag:gaurav9878764239@cluster0.dirde.mongodb.net/BookManagement-Group9",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use('/', route);

app.listen(3000, function () {
  console.log("Express app running on port" + 3000);
});








