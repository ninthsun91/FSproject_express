import express from "express";
import DbConnection from "../database/connect.js";


const router = express.Router();


router.get("/", (req, res)=>{
    res.render("index")
    // res.send("INDEX ROUTER");
});


router.get("/test", (req, res)=>{
    const dbConnect = DbConnection.getDb();

    dbConnect
        .collection("users").findOne({}, (err, user)=>{
            console.log(user);
            res.send({ "msg": "SUCCESS", "user": user });
        });
});


router.get("/connect", (req, res)=>{
    DbConnection.connectToServer(()=>{
        console.log("CONNECTED");
    });
});


router.get("/close", (req, res)=>{
    console.log("CLOSED")
    DbConnection.closeDb();
});


export default router;


// const document = {
//     "username": "express",
//     "password": "express",
//     "email": "express@node.com",
// }

// dbConnect
//     .collection("users")
//     .insertOne(document, (err, result) => {
//         if (err) {
//             console.log("Error inserting document!");
//         } else {
//             console.log("INSERT ONE")
//             return result.insertedId;
//         }
//     });