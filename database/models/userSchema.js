import { userInsertOne } from "../controllers/userControllers";


class UserSchema {
    constructor( _id, email, username, password, reviews, likes, image, image_data ) {
        this._id = _id
        this.email = email
        this.username = username
        this.password = password
        this.reviews = reviews
        this.likes = likes
        this.image = image
        this.image_data = image_data
    }

    insert() {
        this.reviews = [];
        this.likes = [];
        this.image = "";
        this.image_data = "";
        const document = {
            "email": this.email,
            "username": this.username,
            "password": this.password,
            "reviews": this.reviews,
            "likes": this.likes,
            "image": this.image,
            "image_data": this.image_data,
        }
        this._id = userInsertOne(document);

        console.log(`user inserted, ${this._id}`);
    }

    getURL() {
        return "/user/" + this._id;
    }
}


export default UserSchema;