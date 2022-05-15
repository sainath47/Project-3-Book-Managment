const jwt = require('jsonwebtoken')

// Authentication
// Make sure all the book routes are protected.
// Authorisation
// Make sure that only the owner of the books is able to create, edit or delete the book.
// In case of unauthorized access return an appropirate error message.


const authentication = async function (req,res,next){
let token = req.headers['x-auth-key']
if(!token) res.status(400).send({status:false,msg:"please login first(no token)"})

    let decodedToken = jwt.verify(token,'mySecret')
  if(!decodedToken) res.status(401).send({status:false, message:"token validation failed"})
  next()

}

const authorization = async function (req,res,next){
    let token = req.headers['x-auth-key']
    if(!token) res.status(400).send({status:false,msg:"please login first(no token)"})
    
        let decodedToken = jwt.verify(token,'mySecret')
        let userId = req.params.userId || req.body.userId || req.query.userId
        if(!userId) return res.status(200).send({status:false,msg:"please provide userId"})
        if(!(decodedToken.userId==userId)) return res.status(401).send({status:false,msg:"not authorized"})
    next()


}
module.exports = {authentication,authorization}