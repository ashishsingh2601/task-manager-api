//jshint esversion:6
//CRUD operations

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;        //MongoClient is used to make connection with mongoDB to perform CRUD operations

//Defining connection URL and database with which we want to connect
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if(error){
        return console.log('Unable to connect to database');
    }
    
   const db = client.db(databaseName);          //Returns a database reference

   db.collection('users').insertOne({
        name: 'Ashish',
        age: 21
   });
    
});
