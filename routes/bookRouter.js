import express from "express";
import { DateTime } from "luxon";
import { ObjectId } from "mongodb";
import dbConnection from "../database/connect.js";


const router = express.Router();
const dbConnect = dbConnection.getDb();

router.get("/view", (req, res)=>{
    const bookId = req.query.id;

    dbConnect
        .collection("books")
        .findOne({"_id": bookId})
        .then((book)=>{
            book._id = book._id.toString();

            res.render("book.html", book=book);
        })
        .catch((err)=>{
            console.log(err);
        });
});


router.get("/reveiw", async(req, res)=>{
    const bookId = new ObjectId(req.query.id);
    // const bookId = new ObjectId("63287f064030fced9a28aa58");

    const reviewIds = [];
    await dbConnect
        .collection("books")
        .findOne({"_id": bookId})
        .then((book)=>{
            reviewIds.push(...book.reviews);
        });

    const result = [];
    for (const reviewid of reviewIds) {
        const id = new ObjectId(reviewid);
        await dbConnect
            .collection("reviews")
            .findOne({"_id": id})
            .then((review)=>{
                review._id = review._id.toString();
                result.push(review);
            });
    }
    
    result.reverse();
    res.json({ "reviews": result });
});


router.get("/review_modal", (req, res)=>{
    res.render("/modals/review.html");
});


router.post("/review_post", (req, res)=>{
    console.log("REVIEW POST");

    const doc = {
        book_id: req.query.id,
        username: "username",
        content: req.body.content,
        rating: Number(req.body.star),
        time: DateTime.local().toFormat("yyyy-LLL-dd HH:mm")
    }
    dbConnect
        .collection("reviews")
        .insertOne(doc)
        .then(({ insertedId })=>{
            res.json({ "msg": "success", "insertedId": insertedId });
        });
});


router.delete("/review_delete", (req, res)=>{
    const reviewId = new ObjectId(req.query.id);
});


router.get("/likes", (req, res)=>{
    console.log("TOGGLE LIKES");
    const userId = new ObjectId("632948bf97d615c443052562");
    const bookId = new ObjectId(req.query.id);
    const flag = Boolean(req.query.flag === "true");

    if (flag) {
        // cancel likes
        console.log("CANCLE LIKES");
        dbConnect
            .collection("users")
            .updateOne({"_id": userId}, {"$pull": {"likes": bookId}})
            .then(({ upsertedId })=>{
                console.log("updated", upsertedId);
                res.json({ msg: "SUCCESS", upsertedId: upsertedId });
            });
    } else {
        // add likes
        console.log("ADD LIKES");
        dbConnect
            .collection("users")
            .updateOne({"_id": userId}, {"$push": {"likes": bookId}})
            .then(({ upsertedId })=>{
                console.log("updated", upsertedId);
                res.json({ msg: "SUCCESS", upsertedId: upsertedId });
            });
    }
});


export default router;