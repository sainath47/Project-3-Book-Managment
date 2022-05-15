const bookModel = require("../model/bookModel");
const reviewModel = require("../model/reviewModel");

const createReview = async function (req, res) {
  try {
   
    let createdReview = await reviewModel.create(req.body)
    await bookModel.findOneAndUpdate({_id:req.params.bookId},{$inc:{reviews:1}})

    res.status(201).send({ status: true, data: createdReview });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};



// /books/:bookId/review/:reviewId

const updateReview = async function(req,res){
    try {
        let updatedReview = await reviewModel.findOneAndUpdate({_id:req.params.reviewId,bookId:req.params.bookId, isDeleted:false},{reviewedAt:new Date(),...req.body},{new:true});
        if(!updatedReview) return res.status(404).send({status:false,message:"either book is deleted or review"})
        res.status(200).send({ status: true, data: updatedReview });
      } catch (err) {
        res.status(500).send({ status: false, message: err.message });
      }
}


const deleteReview = async function( req,res){
    try{
let deletedReview = await reviewModel.findOneAndUpdate({_id:req.params.reviewId,bookId:req.params.bookId, isDeleted:false},{deletedAt:new Date(),isDeleted:true},{new:true})
if(!deletedReview) return res.status(404).send({status:false,message:"either of book or review is deleted"})
res.status(200).send({ status: true, data: deletedReview });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
      }
}

module.exports = { createReview,updateReview,deleteReview };
