import express from "express";
import DbConnection from "../database/connect.js";


const router = express.Router();


router.get("/", (req, res)=>{
    res.render("index")
    // res.send("INDEX ROUTER");
});


router.get("/list", (req, res)=>{
    const dbConnect = DbConnection.getDb();

    const bookList = Array.from(dbConnect
        .collection("books")
        .find());

    res.json({ "bookList": bookList })
});


router.get("/test", (req, res)=>{
    const dbConnect = DbConnection.getDb();

    dbConnect
        .collection("users")
        .findOne({}, (err, user)=>{
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