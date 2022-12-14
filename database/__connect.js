import { MongoClient } from "mongodb";

const connectionString = "";
const client = new MongoClient(connectionString);


const dbConnection = {
    dbConnection: {},

    connectToServer(callback) {
        client.connect()
            .then( (db)=>{
                this.dbConnection = db.db("minibook");
                console.log("Successfully connected to MongoDB.")

                return callback();
            })
            .catch( (err, db)=>{
                if (err || !db) {
                    return callback(err);
                }
            });
    },

    getDb: function() {
        return this.dbConnection;
    },

    closeDb: function() {
        client.close();
    }
}

export default dbConnection;

// export default class DbConnection {
//     dbConnection = {};

//     connectToServer(callback) {
//         client.connect()
//             .then( (db)=>{
//                 this.dbConnection = db.db("miniboook");
//                 console.log("Successfully connected to MongoDB.")
//                 console.log("from connect.js", this.dbConnection)

//                 return callback();
//             })
//             .catch( (err, db)=>{
//                 if (err || !db) {
//                     return callback(err);
//                 }
//             });
//     }

//     getDb() {
//         return this.dbConnection;
//     }
// }


// export default function getDb(callback) {
//     client.connect()
//         .catch( (err, db)=>{
//             if (err || !db) {
//                 console.log(err);
//                 process.exit();
//             }
//         });

//     const dbConnection = db.db("minibook");
//     console.log("Successfully connected to MongoDB.");

//     return callback();
// }
