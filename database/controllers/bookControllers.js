import { body, validationResult } from "express-validator";
import { DateTime } from "luxon";
import async from "async";

import BookSchema from "../models/bookSchema.js";
import ReviewSchema from "../models/reviewSchema.js";
import UserSchema from "../models/userSchema.js";


// 전체 리스트
export function bookListAll(req, res, next) {
    console.log("bookListAll")
    BookSchema.find({}).exec((err, bookList)=>{
        if (err) {
            return next(err);
        }
        res.json({ "b_list": bookList });
    });
}


// 책 상세 페이지. /book/view?book_id
export function bookDetail(req, res, next) {
    console.log("bookDetail");

    let token_info = true;  // payload

    BookSchema.findById(req.params.id).exec((err, book)=>{
        if (err) {
            return next(err);
        }
        book._id = book._id.toString();
        book["flag"] = false;

        res.json({
            bookView: book,
            token_info: token_info,
        })
        // res.render("book", {
        //     bookView: book,
        //     token_info: token_info,
        // });
    });
}


// 해당 책의 리뷰들. /book/review?isbn_give
export async function bookReviewList(req, res, next) {
    console.log("bookReviewList");

    const reviewIds = [];
    await BookSchema
        .findById(req.params.id)
        .exec()
        .then((book)=>reviewIds.push(...book.reviews))
        .catch((err)=>next(err));
    
    const reviewList = [];
    for (const reviewId of reviewIds) {
        await ReviewSchema
            .findById(reviewId)
            .exec()
            .then((review)=>reviewList.push(review))
            .catch((err)=>next(err));
    }
    
    res.json({ reviewList: reviewList });
}



// 리뷰 작성. POST
export const bookReviewPost = [
    // function() {
    //     console.log("bookReviewPost");
    // },
    body("content")
        .trim()
        .isLength({ min: 10, max: 100 })
        .escape(),
    body("star")
        .isInt(),
    function(req, res, next) {
        console.log("PASSED VALIDATION")
    // 받은 데이터를 문서화 해야겠죠
    // create()
        const errors = validationResult(req);

        const review = new ReviewSchema({
            book_id: req.params.id,
            username: "username", //payload
            content: req.body.content,
            rating: req.body.star,
            time: DateTime.now().toMillis(),
        });
        
        if (!errors.isEmpty()) {
            console.log("WRONG REQUEST")
        } else {
            review.save((err)=>{
                if (err) {
                    return next(err);
                }

                res.send("REVIEW POSTED");
            });
        }
    }
];


// 리뷰 삭제. /book/reviewdelete?review_id
export async function bookReviewDelete(req, res, next) {
    console.log("bookReviewDelete");
    // 페이로드 > 유저id
    // params > 리뷰id
    // 리뷰 찾기
    // 리뷰 > 책id > 책 찾기
    // parallel > 유저&책 리뷰id 지우고 업데이트
    const userId = "632948bf97d615c443052562"   // jwt token > payload
    const reviewId = req.params.id;

    const review = {};
    await ReviewSchema
        .findById(reviewId)
        .exec()
        .catch((err)=>next(err))
        .then((result)=>{
            Object.assign(review, result._doc);
        });
    const bookId = review.book_id;

    async.parallel(
        {
            reviewDelete: (callback)=>{
                ReviewSchema.findByIdAndDelete(reviewId).exec(callback);
            },
            userUpdate: (callback)=>{
                UserSchema.findByIdAndUpdate(userId, {"$pull": {"reviews": reviewId}}).exec(callback);
            },
            bookUpdate: (callback)=>{
                BookSchema.findByIdAndUpdate(bookId, {"$pull": {"reviews": reviewId}}).exec(callback);
            }
        },
        function (err, results) {
            if (err) {
                return next(err);
            }

            res.send(`${reviewId} deleted from user(${userId}), book(${bookId})`);
        }
    );
}


// 좋아요 토글링. /book/like/:id/?flag
export function bookLikeToggle(req, res, next) {
    console.log("bookLikeToggle");
    // params > bookid
    // qs > like status flag
    // token > userid
    // bookfind > userid in book.reviews > flag
    // update book & user
    const bookId = req.params.id;
    const flag = req.query.flag ? req.query.flag === "true" : false;
    const userId = "632948bf97d615c443052562"   // token > payload
    console.log("flag: " + flag);

    switch (flag) {
        case true:      // like >> unlike
            console.log("dislike it");
            async.parallel(
                {                
                    bookUpdate: (callback)=>{
                        BookSchema.findByIdAndUpdate(bookId, {"$pull": {"likes": userId}}).exec(callback);                
                    },
                    userUpdate: (callback)=>{
                        UserSchema.findByIdAndUpdate(userId, {"$pull": {"likes": bookId}}).exec(callback);
                    }
                },
                function (err, results) {
                    if (err) {
                        console.log("ERROR")
                        console.log(err())
                        return next(err);
                    }

                    console.log(results);
                    res.send(`user(${userId}) dislike book(${bookId})`);
                }
            );
            break;
        case false:     // unlike >> like
            console.log("like it");
            async.parallel(
                {
                    bookUpdate: (callback)=>{
                        BookSchema.findByIdAndUpdate(bookId, {"$push": {"likes": userId}}).exec(callback);
                    },
                    userUpdate: (callback)=>{
                        UserSchema.findByIdAndUpdate(userId, {"$push": {"likes": bookId}}).exec(callback);
                    }
                },
                function (err, results) {
                    if (err) {
                        console.log("ERROR")
                        console.log(err())
                        return next(err);
                    }

                    console.log(results);
                    res.send(`user(${userId}) like book(${bookId})`);
                }
            );
            break;
    }    
}


export function bookTest(req, res, next) {
    console.log("bookTest");
    const userId = req.params.id;
    
    async.parallel(
        {
            usersFind: (callback)=>{
                UserSchema.find(callback);
            },
            userFind: (callback)=>{
                UserSchema.findById(userId).exec(callback)
            }
        },
        function (err, results) {
            console.log(results.userFind)

            res.send(results);
        }
    );
}





// import dbConnection from "../connect";

// export function bookInsertOne(document) {
//     const dbConnect = dbConnection.getDb();

//     dbConnect
//         .collection("books")
//         .insertOne(document)
//         .then((result)=>{
//             return result.insertedId;
//         })
//         .catch((err)=>{
//             console.log("Failed to insert document");
//         });
// }