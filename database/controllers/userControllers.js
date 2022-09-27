import UserSchema from "../models/userSchema";
import dbConnection from "../connect";

export function userInsertOne(document) {
    const dbConnect = dbConnection.getDb();

    dbConnect
        .collection("users")
        .insertOne(document)
        .then((result)=>{
            return result.insertedId;
        })
        .catch((err)=>{
            console.log("Failed to insert document");
        });
}