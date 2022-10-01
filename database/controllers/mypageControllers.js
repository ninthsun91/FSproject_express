import BookSchema from "../models/bookSchema.js";
import ReviewSchema from "../models/reviewSchema.js";
import UserSchema from "../models/userSchema.js";





// 내가 작성한 리뷰 리스트.



// 내 좋아요 책 리스트



// 프로필 수정



// 












// import dbConnection from "../connect";

// export function reviewInsertOne(document) {
//     const dbConnect = dbConnection.getDb();

//     dbConnect
//         .collection("reviews")
//         .insertOne(document)
//         .then((result)=>{
//             return result.insertedId;
//         })
//         .catch((err)=>{
//             console.log("Failed to insert document");
//         });
// }