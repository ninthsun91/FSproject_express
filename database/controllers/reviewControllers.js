import ReviewSchema from "../models/reviewSchema";
import dbConnection from "../connect";

export function reviewInsertOne(document) {
    const dbConnect = dbConnection.getDb();

    dbConnect
        .collection("reviews")
        .insertOne(document)
        .then((result)=>{
            return result.insertedId;
        })
        .catch((err)=>{
            console.log("Failed to insert document");
        });
}