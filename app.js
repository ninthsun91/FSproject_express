import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import session from "express-session";
import pug from "pug";

import connectDb from "./database/connect.js";

// import Routers
import bookRouter from "./routes/bookRouter.js";
import indexRouter from "./routes/indexRouter.js";
import mypageRouter from "./routes/mypageRouter.js";
import userRouter from "./routes/userRouter.js";


import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


import dotenv from "dotenv";
dotenv.config();


const app = express();
const port = process.env.PORT || 5000;


app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug");


// Middlewares
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));


// use Routers
app.use("/book", bookRouter);
app.use("/", indexRouter);
app.use("/mypage", mypageRouter);
app.use("/user", userRouter);


connectDb();


// error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.render("error");
});


app.listen(port, ()=>{
    console.log(`running on port number ${port}`);
});
    
    
export default app;
    

// set DEBUG=fullstack_express:* & npm start



// // terminate server when fails to connect DB
// dbConnection.connectToServer( (err)=>{
//     if (err) {
//         console.log(err);
//         process.exit();
//     }

//     app.listen(port, ()=>{
//         console.log(`running on port number ${port}`);
//     });
// });