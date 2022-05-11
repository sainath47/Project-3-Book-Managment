const userModel= require('../model/userModel')

const createUser= async function(req,res){

    boby =req.body

    let userCreated =await userModel.create(body)
}


