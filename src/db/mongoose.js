//jshint esversion:6
//This file is used only for connecting with database.

const mongoose = require('mongoose');
//const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,  
    useCreateIndex: true,                  //Ensures that indexes are created when mongoose works with mongoDB making data access easier.
    useFindAndModify: false
});

//Defining model


// const me = new User({
//     name: 'Ashish',
//     email: 'as7220004@gmail.com',
//     age: 21,
//     password: 'hello123'
// });

// me.save().then((me)=>{
//     console.log(me);
// }).catch((error)=>{
//     console.log(error);
// });


// const task = new Tasks({
//     description: 'Plant Trees',
//     completed: true
// });

// task.save().then((task)=>{
//     console.log(task);
// }).catch((error)=>{
//     console.log(error);
// });