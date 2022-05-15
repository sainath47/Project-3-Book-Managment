const {check,param,body, validationResult} = require('express-validator')

exports.validationsForCreateReview = [

    param("bookId")
    .trim()
    .not()
    .isEmpty()
    .withMessage("bookId is a required field in param")
    .matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
    .withMessage("invalid bookId"),

    body("bookId")
    .trim()
    .not()
    .isEmpty()
    .withMessage("bookId is a required field in body")
    .matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
    .withMessage("invalid bookId"),

   

    check("reviewedBy")
    .trim()
    .not()
    .isEmpty()
    .optional()
    .withMessage("reviewedBy is required field"),

    check("rating")
    .trim()
    .not()
    .isEmpty()
    .withMessage("rating is required field")
    .isNumeric({ min: 1, max: 5 })
    .withMessage("within 1 to 5"),


    check("review")
    .trim()


]

exports.catchErrorOfInputCreateReview =  function(req,res,next){
    let result = validationResult(req).array()
    if(!result.length) return next()
    let error = result[0].msg
    res.status(400).send({status:false,message:error})
}


exports.validationsForUpdateReview = [

    check("bookId")
    .trim()
    .not()
    .isEmpty()
    .withMessage("bookId is a required field")
    .matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
    .withMessage("invalid bookId"),

    check("reviewId")
    .trim()
    .not()
    .isEmpty()
    .withMessage("reviewId is a required field")
    .matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
    .withMessage("invalid reviewId"),

    check("reviewedBy")
    .trim(),


    check("rating")
    .trim()
    .isNumeric({ min: 1, max: 5 })
    .withMessage("within 1 to 5"),


    check("review")
    .trim()


]

exports.catchErrorOfInputUpdateReview =  function(req,res,next){
    let result = validationResult(req).array()
    if(!result.length) return next()
    let error = result[0].msg
    res.status(400).send({status:false,message:error})
}



exports.validationsForDeleteReview = [

    check("bookId")
    .trim()
    .not()
    .isEmpty()
    .withMessage("bookId is a required field")
    .matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
    .withMessage("invalid bookId"),

    check("reviewId")
    .trim()
    .not()
    .isEmpty()
    .withMessage("reviewId is a required field")
    .matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
    .withMessage("invalid reviewId"),



]

exports.catchErrorOfInputDeleteReview =  function(req,res,next){
    let result = validationResult(req).array()
    if(!result.length) return next()
    let error = result[0].msg
    res.status(400).send({status:false,message:error})
}




// {
//     bookId: {ObjectId, mandatory, refs to book model},
//     reviewedBy: {string, mandatory, default 'Guest', value: reviewer's name},
//     reviewedAt: {Date, mandatory},
//     rating: {number, min 1, max 5, mandatory},
//     review: {string, optional}
//     isDeleted: {boolean, default: false},
//   }