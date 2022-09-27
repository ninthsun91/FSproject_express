import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import session from "express-session";

// import Routers

import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
const port = process.env.port || 5000;


// Middlewares
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("secret"));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "secret",
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));

app.get("/", (req, res)=>{
    res.send("hello world");
});


// use Routers


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