import mongoose from "mongoose";


const Schema = mongoose.Schema;


const UserSchema = new Schema({
    email: { type: String, required: true },
    username: { type: String, requied: true },
    password: { type: String, required: true },
    reviews: { type: Array },
    likes: { type: Array },
    image: { type: String },
    image_data: { type: String },
    // Users: [Schema.Types.ObjectId],
    // likes: [Schema.Types.ObjectId],
});

UserSchema.virtual("url").get(function() {
    return `/user/${this._id}`;
});


export default mongoose.model("User", UserSchema);