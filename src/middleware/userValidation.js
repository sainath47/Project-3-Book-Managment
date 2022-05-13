const { check, validationResult } = require("express-validator");
const userModel = require("../model/userModel");

exports.validateCreateUserInputs = [
  check("title")
    .trim()
    .not()
    .isEmpty()
    .withMessage("title is a required field")
    .matches(/\b(?:Mr|Miss|Mast)\b/)
    .withMessage("title cant othan than Mr, Mrs, Miss"),
   

  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("name is a required field")
    .not()
    .isNumeric()
    .withMessage("invalid name , can't be numeric")
    .isLength({ min: 3, max: 20 })
    .withMessage("name must be within 3 to 20 characters"),

    check("phone")
    .trim()
    .not()
    .isEmpty()
    .withMessage("mobile is a required field")
    .isNumeric()
    .isLength({ min: 10, max: 10 })
    .withMessage("invalid mobile number, should contain 10 digits"),


    check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("email is a required field")
    .normalizeEmail()
    .isEmail()
    .withMessage("invalid email-Id"),

    check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("name is a required field")
    .isLength({ min: 8, max: 15 })
    .withMessage("name must be within 3 to 20 characters"),


  
    check('address.street').trim(),
    check('address.city').trim().optional(),
    check('address.pincode').trim().isNumeric()
   
     

];

exports.catchErrorOfUserInput = function(req,res,next){
const result = validationResult(req).array()
if(!result.length) return next() 
const error = result[0].msg;
res.status(400).send({status:false,message : error})}

exports.additionalValidationsCreateUser = async function(req,res,next){

  const {phone,email} = req.body
  let findMobile = await userModel.findOne({phone})
  if(findMobile) return res.status(400).send({status:false,message:"account already exit with this mobile no."})
  let findEmail = await userModel.findOne({email})
  if(findEmail) return res.status(400).send({status:false,message:"account already exit with this Email"})
 
  next()
}


exports.loginUserInputsValidation = [
  check("email")
  .trim()
  .not()
  .isEmpty()
  .withMessage("email is a required field")
  .normalizeEmail()
  .isEmail()
  .withMessage("invalid email-Id"),

  check("password")
  .trim()
  .not()
  .isEmpty()
  .withMessage("name is a required field")
  .isLength({ min: 8, max: 15 })
  .withMessage("name must be within 3 to 20 characters"),

]


exports.catchErrorOfLoginInput = function(req,res,next){
  const result = validationResult(req).array()
  if(!result.length) return next() 
  const error = result[0].msg;
  res.status(400).send({status:false,message : error})}


exports.additionalValidationsLoginUser = async function(req,res,next){

  const {email,password}= req.body
  let findUser = await userModel.findOne({email,password})
  if(!findUser) return res.status(400).send({status:false,message:"no account with this credentials exist,please register"})
req.userId = findUser._id
  next()
}









// const { check, validationResult } = require("express-validator/check");
// const collegeModel = require("../../Models/collegeModel");
// const internModel = require("../../Models/internModel");

// //POST/functionup/colleges  : server-side validations

// exports.validateCollegeCreate = [
//   check("name").trim().not().isEmpty().withMessage("name is a required field").not().isNumeric().withMessage("invalid name , can't be numeric").isLength({ min: 3, max: 20 }).withMessage("name must be within 3 to 20 characters"),

//   check("fullName").trim().not().isEmpty().withMessage("fullName is a required field").not().isNumeric().withMessage("invalid name, can't be numeric").isLength({ min: 5, max: 50 }).withMessage("fullName must be within 3 to 50 characters"),

//   check("logoLink").trim().not().isEmpty().withMessage("logoLink is a required field").isURL().withMessage("not a valid url")
// ];



// // POST/functionup/colleges  : Validations for duplicate data

// exports.validatedCollegeCreateDB = async (req, res, next) => {
//     const body = req.body;
//     if(body.isDeleted&&body.isDeleted !=true)
//     return res.status(400).send({status : false , message : "only false value is accepted in isDeleted key"})

//   //check if name is abbreviated or not
//     if (body.name.split(" ").length > 1)
//     return res.status(400).send({ status: false, msg: "please provide the Valid Abbreviation" });

//     // Checking duplicate name
//     const duplicateName = await collegeModel.findOne({ name: body.name });
//     if (duplicateName)
//       return res.status(400).send({ status: false, msg: "College Name already exists" });

//     //Checking duplicate Logo Link
//     const duplicatelogoLink = await collegeModel.findOne({logoLink: body.logoLink,});
//     if (duplicatelogoLink)
//       return res.status(409).send({status: false,msg: "The logo link which you have entered belong to some other college"});

//   // isDeleted should be false
//     if (body.isDeleted === true)
//     return res.status(400).send({ status: false, msg: "New entries can't be deleted" });

//    next();
// };

// //GET//functionup/collegeDetails : Validations for duplicate data

// exports.validateCollegeDB = async (req, res, next) => {
//   let collegeName = req.query.collegeName;
//   if(!collegeName)
//   return res.status(400).send({status : false , message : "Enter the name of college"})

//   const collegeNames = await collegeModel.findOne({ name: collegeName });
//   if (!collegeNames)
//     return res.status(404).send({status: false, message: "College Not Found" });
//   const collegeId = collegeNames._id;
//   const interns = await internModel.find({ collegeId: collegeId , isDeleted : false }).select({ _id: 1, email: 1, name: 1, mobile: 1 });

//   req.interns = interns;
//   req.collegeNames = collegeNames;
//   next();
// };
