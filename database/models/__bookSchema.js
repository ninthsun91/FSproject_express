import { bookInsertOne } from "../controllers/bookControllers"


class BookSchema {
    constructor( _id, title, image, author, pubdate, publisher, discount,
        description, isbn, likes, reviews ) {
        
        this._id = _id
        this.title = title
        this.image = image
        this.author = author
        this.pubdate = pubdate
        this.publisher = publisher
        this.discount = discount
        this.description = description
        this.isbn = isbn
        this.likes = likes
        this.reviews = reviews
    }

    insert() {
        this.likes = [];
        this.reviews = [];
        const document = {
            "title": this.title,
            "image": this.image,
            "author": this.author,
            "publisher": this.author,
            "discount": this.discount,
            "description": this.description,
            "isbn": this.isbn,
            "likes": this.likes,
            "reviews": this.reviews,
        }
        this._id = bookInsertOne(document);

        console.log(`book inserted, ${this._id}`);
    }

    getURL() {
        return "/book/" + this._id;
    }
}


export default BookSchema;