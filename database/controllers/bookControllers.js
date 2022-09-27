import BookSchema from "../models/bookSchema";
import dbConnection from "../connect";

export function bookInsertOne(document) {
    const dbConnect = dbConnection.getDb();

    dbConnect
        .collection("books")
        .insertOne(document)
        .then((result)=>{
            return result.insertedId;
        })
        .catch((err)=>{
            console.log("Failed to insert document");
        });
}