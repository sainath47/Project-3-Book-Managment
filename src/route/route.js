const express = require("express");
const { createUser, login } = require("../controller/userController");
const { validateCreateUserInputs, catchErrorOfUserInput, additionalValidationsCreateUser, additionalValidationsLoginUser, catchErrorOfLoginInput, loginUserInputsValidation } = require("../middleware/userValidation");
const router = express.Router();// we were able to use app for get request but not here ,as we need Router function here ,why

// router.get('/homepage',function(req,res){
//     res.send({msg:"namastey sir"})
// })

router.post('/register',validateCreateUserInputs,catchErrorOfUserInput,additionalValidationsCreateUser ,createUser )
router.post('/login',loginUserInputsValidation,catchErrorOfLoginInput,additionalValidationsLoginUser ,login)


module.exports= router

















// const router = express.Router()
// const { validateAuthor, authorValidated } = require('../validations/userValidations')

// router.post("/register", validateAuthor, authorValidated, creatUser);
// router.post("/login", loginUser);
// //=========================
// router.post("/books",  createBook);
// router.get("/books", getBook);
// router.get("/books/:bookId", bybookId);
// router.put("/books/:bookId", updateBook);
// router.delete("/books/:bookId", deleteById);
// //================================
// router.post("/books/:bookId/review", createReview);
// router.put("/books/:bookId/review/:reviewId", updateReview);
// router.delete("/books/:bookId/review/:reviewId", deleteReviewById);



// module.exports = router
