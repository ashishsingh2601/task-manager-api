//jshint esversion:6

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,  
    useCreateIndex: true                        //Ensures that indexes are created when mongoose works with mongoDB making data access easier.
});

//Defining model

const User = mongoose.model('User', {
        name: {
            type: String
        },
        age: {
            type: Number
        }
});

const me = new User({
    name: 'Ashish',
    age: 21
});

me.save().then((me)=>{
    console.log(me);
}).catch((error)=>{
    console.log(error);
});