import mongoose from "mongoose";


const Schema = mongoose.Schema;


const ReviewSchema = new Schema({
    book_id: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    username: { type: String, requied: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true },
    time: { type: Date, required: true },
}, { timestamps: true });

ReviewSchema.virtual("url").get(function() {
    return `/review/${this._id}`;
});


export default mongoose.model("Review", ReviewSchema);