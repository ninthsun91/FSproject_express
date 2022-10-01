import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoDb = process.env.MONGODB_URL;

export default function() {
    mongoose
        .connect(mongoDb, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "minibook",
        })
        .then(()=>{
            console.log("DB connected")
        })
        .catch((err)=>console.error.bind(err));
}

mongoose.connection.on("error", console.error.bind(console, "MongoDB Connection Fail"));