//jshint esversion:6

const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,  
    useCreateIndex: true                        //Ensures that indexes are created when mongoose works with mongoDB making data access easier.
});

//Defining model

const User = mongoose.model('User', {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error('Invalid E-mail');
                }
            }
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minLength: 7,
            validate(value){
                if(value.toLowerCase().includes('password'))
                throw new Error("Password cannot contain 'password' ");
            }
        },
        age: {
            type: Number,
            default: 0,
            validate(value){
                if(value<0){
                    throw new Error('Age must be a positive number');
                }
            }
        }
});

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

const Tasks = mongoose.model('Tasks', {
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const task = new Tasks({
    description: 'Plant Trees',
    completed: true
});

task.save().then((task)=>{
    console.log(task);
}).catch((error)=>{
    console.log(error);
});