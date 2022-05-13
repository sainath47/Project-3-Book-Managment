const userModel = require("../model/userModel");
const jwt = require('jsonwebtoken')
const createUser = async function (req, res) {
 try{ let body = req.body;

  let userCreated = await userModel.create(body);

  res.status(201).send({ status: true, data: userCreated });}
  catch(err){
      res.status(500).send({status:false,message: err.message})
  }
};


const login = async function(req,res){
    try{

let token = jwt.sign({userId:req.userId},'mySecret',{expiresIn:'2d'})

res.header("x-auth-key",token)

res.status(200).send({status:true,data: token})

    }
    catch(err){
        res.status(500).send({status:false,message:err.message})
    }
}

module.exports = { createUser,login };
