const bookModel = require("../model/bookModel");
const moment = require("moment");
// const { now } = require("mongoose");
const reviewModel = require("../model/reviewModel");
const createBook = async function (req, res, next) {
  try {
    let data = req.body;
    let bookCreated = await bookModel.create(data);
    res.status(201).send({ status: true, data: bookCreated });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const getBooks = async function (req, res, next) {
  try {
    let findBooks = await bookModel
      .find({ ...req.query, isDeleted: false })
      .sort({ title: 1 });

    if (!findBooks.length)
      return res.status(404).send({
        status: false,
        message: "no book found with this credentials",
      });

    res.status(200).send({ Status: true, data: findBooks });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

const getBookById = async function (req, res) {
  try {
    let bookId = req.params.bookId;

    let findBook = await bookModel.findOne({ _id: bookId, isDeleted: false }).lean();
    if (!findBook)
      return res
        .status(404)
        .send({ status: false, message: "no book exists with this bookId" });

        let allReviews = await reviewModel.find({bookId:bookId,isDeleted:false})

        findBook['reviewData']=allReviews

    res.status(200).send({ status: true, data: findBook });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const updateBook = async function (req, res) {
  try {
    let UpdatedBook = await bookModel.findOneAndUpdate(
      { _id: req.params.bookId, isDeleted: false },
      { ...req.body, releasedAt: new Date() },
      { new: true }
    );
    if (!UpdatedBook)
      return res.status(404).send({ status: false, message: "no book found" });
    res.status(200).send({ status: true, data: UpdatedBook });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const deleteBook = async function (req, res) {
  try {let bookId =req.params.bookId
    let deletedBook = await bookModel.findOneAndUpdate(
      { _id: bookId, isDeleted: false },
      { isDeleted: true, deletedAt: moment(new Date()).format("YYYY-MM-DD") },
      { new: true }
    );

     await reviewModel.updateMany({bookId:bookId},{isDeleted:true, deletedAt:moment(new Date()).format("YYYY-MM-DD")})

    if (!deletedBook)
      return res.status(404).send({ status: false, message: "no book found" });
    res.status(200).send({ status: true, data: deletedBook });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { createBook, getBooks, getBookById, updateBook, deleteBook };
 