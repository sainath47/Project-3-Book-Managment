const { check, validationResult } = require("express-validator");
const bookModel = require("../model/bookModel");

exports.validateBookCreateInputs = [
  check("title")
    .trim()
    .not()
    .isEmpty()
    .withMessage("title is a required field")
    .not()
    .isNumeric()
    .withMessage("invalid title , can't be numeric")
    .isLength({ min: 3, max: 30 })
    .withMessage("title must be within 3 to 20 characters"),

  check("excerpt")
    .trim()
    .not()
    .isEmpty()
    .withMessage("excerpt is a required field"),

  check("userId")
    .trim()
    .not()
    .isEmpty()
    .withMessage("userId is a required field")
    .matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
    .withMessage("invalid userId"),

  check("ISBN")
    .trim()
    .not()
    .isEmpty()
    .withMessage("ISBN is a required field")
    .matches(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/i)
    .withMessage("invalid userId"),

  check("category")
    .trim()
    .not()
    .isEmpty()
    .withMessage("category is a required field")
    .not()
    .isNumeric()
    .withMessage("invalid category , can't be numeric"),

  check("subcategory")
    .trim()
    .not()
    .isEmpty()
    .withMessage("subcategory is a required field")
    .not()
    .isNumeric()
    .withMessage("invalid subcategory , can't be numeric"),
];

exports.catchErrorCreateBook = function (req, res, next) {
  let result = validationResult(req).array();
  if (!result.length) return next();
  let error = result[0].msg;
  res.status(400).send({ status: false, message: error });
};

exports.additionalValidationsCreateBook = async function (req, res, next) {
  const { ISBN, title } = req.body;
  let findBookByTitle = await bookModel.findOne({ title });
  if (findBookByTitle)
    return res
      .status(400)
      .send({ status: false, message: "book already with this title" });
  let findBookByISBN = await bookModel.findOne({ ISBN });
  if (findBookByISBN)
    return res
      .status(400)
      .send({ status: false, message: "book already with this ISBN" });
  next();
};

exports.validatingInputsOfGetBooks = [


  check("userId")
    .trim()
    .optional()
    .matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
    .withMessage("invalid userId"),

  check("category")
    .trim()
    .not()
    .isNumeric()
    .withMessage("invalid category , can't be numeric"),

  check("subcategory")
    .trim()
    .not()
    .isNumeric()
    .withMessage("invalid subcategory , can't be numeric"),
];

exports.catchErrorInputOfGetBooks = function (req, res, next) {
  let result = validationResult(req).array();
  if (!result.length) return next();
  let error = result[0].msg;
  res.status(400).send({ status: false, message: error });
};

exports.validatingInputsOfBookById = [
  check("bookId")
    .trim()
    .not()
    .isEmpty()
    .matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
    .withMessage("invalid bookId"),
];

exports.catchErrorInputOfBookById = function (req, res, next) {
  let result = validationResult(req).array();
  if (!result.length) return next();
  let error = result[0].msg;
  res.status(400).send({ status: false, message: error });
};

exports.validateUpdateBookInputs = [
  check("title")
    .trim()
    .isEmpty()
    .withMessage("title cant be modified ,since it is unique property"),

  check("excerpt").trim(),

  check("ISBN")
    .trim()
    .optional()
    .isEmpty()
    .withMessage("ISBN cant be modified,since it is unique property")
    .matches(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/i)
    .withMessage("invalid userId"),

  check("releasedAt").trim(),
];

exports.catchErrorUpdateBookInputs = function (req, res, next) {
  let result = validationResult(req).array();
  if (!result.length) return next();
  let error = result[0].msg;
  res.status(400).send({ status: false, message: error });
};

exports.validateInputOfDeleteBook = [
  check("bookId")
    .trim()
    .not()
    .isEmpty()
    .matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
    .withMessage("invalid bookId"),
];

exports.catchErrorDeleteBookInput = function (req, res, next) {
  let result = validationResult(req).array();
  if (!result.length) return next();
  let error = result[0].msg;
  res.status(400).send({ status: false, message: error });
};

// {
//     title: {string, mandatory, unique},
//     excerpt: {string, mandatory},
//     userId: {ObjectId, mandatory, refs to user model},
//     ISBN: {string, mandatory, unique},
//     category: {string, mandatory},
//     subcategory: [string, mandatory],
//     reviews: {number, default: 0, comment: Holds number of reviews of this book},
//     deletedAt: {Date, when the document is deleted},
//     isDeleted: {boolean, default: false},
//     releasedAt: {Date, mandatory, format("YYYY-MM-DD")},
//     createdAt: {timestamp},
//     updatedAt: {timestamp},
//   }
