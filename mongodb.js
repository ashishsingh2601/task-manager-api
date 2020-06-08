//jshint esversion:6
//CRUD operations

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;               //MongoClient is used to make connection with mongoDB to perform CRUD operations
// const ObjectID = mongodb.ObjectID; 

//Short-hand way of requiring object and it's properties (Destructuring)
const { MongoClient, ObjectID} = require('mongodb');      //Equivalent to code on lines 4, 5 and 6

//Defining connection URL and database with which we want to connect
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// const id = new ObjectID();                                //ObjectID is a constructor function 
// console.log(id);
// console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if(error){
        return console.log('Unable to connect to database');
    }

  

    const db = client.db(databaseName);                    //Returns a database reference

      //CREATE
//        db.collection('users').insertOne({
//             name: 'Ashish',
//             age: 21
//        }, (error, result)=>{
//            if(error){
//                 return console.log('Unable to insert user');
//            }
//                 console.log(result.ops);
//        });
    // db.collection('users').insertMany([
    //     {
    //         name: 'Ashish',
    //         age: 21
    //     }, {
    //         name: 'Tom',
    //         age: 69
    //     }
    // ], (error, result)=>{
    //     if(error){
    //         return console.log('Unable to insert documents');
    //     }
    //     console.log(result.ops);
    // });

    //READ

    // db.collection('users').findOne({ name: 'Ashish', age: 9}, (error, result)=>{
    //     if(error){
    //         return console.log('Unable to find document');
    //     }
        
    //     console.log(result);
    // });

    // find() doesn't return data(array of documents) likewise fineOne() do, rather it returns a cursor/pointer to that data

    // db.collection('users').find({age: 21}).toArray((error, result)=>{
    //     if(error){
    //         return console.log('Unable to find documents');
    //     }
    //     console.log(result);
    // });
    // db.collection('users').find({age: 21}).count((error, result)=>{
    //     if(error){
    //         return console.log('Unable to find documents');
    //     }
    //     console.log(result);
    // });

    //UPDATE (using promises)
    // db.collection('users').updateOne({                              
    //      _id: new ObjectID("5edcc425ff167606b88b622e")
    //     }, { 
    //       $inc: {
    //             age: 1
    //       }
    //      }).then((result)=>{
    //         console.log(result);
    //      }).catch((error)=>{
    //          console.log(error);
    //      });

});
