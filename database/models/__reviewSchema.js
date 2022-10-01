import { DateTime } from "luxon";
import { reviewInsertOne } from "../controllers/reviewControllers";


class ReviewSchema {
    constructor( _id, book_id, username, content, rating, time ) {
        this._id = _id
        this.book_id = book_id
        this.username = username
        this.content = content
        this.rating = rating
        this.time = time
    }

    insert() {
        this.time = DateTime.DATETIME_MED;
        const document = {
            "book_id": this.book_id,
            "username": this.username,
            "content": this.content,
            "rating": this.rating,
            "time": this.time,
        }
        this._id = reviewInsertOne(document);

        console.log(`review inserted, ${this._id}`);
    }

    getURL() {
        return "/review/" + this._id;
    }
}


export default ReviewSchema;