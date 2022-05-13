const express = require("express");
const {createBook, getBooks, getBookById, updateBook, deleteBook} = require("../controller/bookController");
const { createReview, updateReview, deleteReview } = require("../controller/reviewController");
const { createUser, login } = require("../controller/userController");
const { validateBookCreateInputs, catchErrorCreateBook, additionalValidationsCreateBook, validatingInputsOfGetBooks, catchErrorInputOfGetBooks, validatingInputsOfBookById, catchErrorInputOfBookById, validateUpdateBookInputs, catchErrorUpdateBookInputs, validateInputOfDeleteBook, catchErrorDeleteBookInput } = require("../middleware/bookValidation");
const { validationsForCreateReview, catchErrorOfInputCreateReview, validationsForUpdateReview, catchErrorOfInputUpdateReview, validationsForDeleteReview } = require("../middleware/reviewValidation");
const { validateCreateUserInputs, catchErrorOfUserInput, additionalValidationsCreateUser, additionalValidationsLoginUser, catchErrorOfLoginInput, loginUserInputsValidation } = require("../middleware/userValidation");
const router = express.Router();// we were able to use app for get request but not here ,as we need Router function here ,why

// router.get('/homepage',function(req,res){
//     res.send({msg:"namastey sir"})
// })


//User apis
router.post('/register',validateCreateUserInputs,catchErrorOfUserInput,additionalValidationsCreateUser ,createUser )
router.post('/login',loginUserInputsValidation,catchErrorOfLoginInput,additionalValidationsLoginUser ,login)
//=========bookApis
router.post('/books',validateBookCreateInputs,catchErrorCreateBook, additionalValidationsCreateBook ,createBook)
router.get('/books',validatingInputsOfGetBooks,catchErrorInputOfGetBooks,getBooks )
router.get('/books/:bookId',validatingInputsOfBookById,catchErrorInputOfBookById,getBookById )
router.put('/books/:bookId',validateUpdateBookInputs,catchErrorUpdateBookInputs,updateBook )
router.delete('/books/:bookId',validateInputOfDeleteBook,catchErrorDeleteBookInput,deleteBook )
//============reviewApis
router.post('/books/:bookId/review',validationsForCreateReview,catchErrorOfInputCreateReview,createReview)
router.put('/books/:bookId/review/:reviewId',validationsForUpdateReview,catchErrorOfInputUpdateReview,updateReview )
router.delete('/books/:bookId/review/:reviewId',validationsForDeleteReview,catchErrorOfInputCreateReview,deleteReview )



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
