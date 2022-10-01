import mongoose from "mongoose";


const Schema = mongoose.Schema;


const BookSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String, requied: true },
    author: { type: String, required: true },
    pubdate: { type: Date, required: true },
    publisher: { type: String, required: true },
    description: { type: String, required: true },
    isbn: { type: String, required: true },
    likes: { type: Array },
    reviews: { type: Array },
});

BookSchema.virtual("url").get(function() {
    return `/book/${this._id}`;
});


export default mongoose.model("Book", BookSchema);