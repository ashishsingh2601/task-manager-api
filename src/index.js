//jshint esversion:6

const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Tasks = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());                //Configuring express to automatically parse the incoming JSON into object

app.post('/users', (req, res)=>{
    const user = new User(req.body);
    user.save().then(()=>{
        res.status(201).send(user);
    }).catch((error)=>{
        res.status(400).send(error);                //Provide res.status() before res.send() always
        //res.send(error);
    });
});

//Reading multiple users
app.get('/users', (req, res)=>{
    User.find({}).then((users)=>{
        res.send(users);
    }).catch((e)=>{
        res.status(500).send();
    });
});

//Reading single user using id
app.get('/users/:id', (req, res)=>{
    const _id = req.params.id;
    User.findById(_id).then((user)=>{
        if(!user){
            return res.status(404).send();
        }
       res.send(user);
    }).catch((e)=>{
        res.status(500).send();
    });
});


app.post('/tasks', (req, res)=>{
    const task = new Tasks(req.body);

    task.save().then(()=>{
        res.status(201).send(task);
    }).catch((error)=>{
        res.status(400).send(error);
    });
});

//Reading multiple tasks
app.get('/tasks', (req, res)=>{
    Tasks.find({}).then((tasks)=>{
        res.send(tasks);
    }).catch((e)=>{
        res.status(500).send();
    });
});

//Reading single task using id
app.get('/tasks/:id', (req, res)=>{
   const _id = req.params.id;
     Tasks.findById(_id).then((task)=>{
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
     }).catch((e)=>{
        res.status(500).send();
     });
});

app.listen(port, ()=>{
    console.log('Server is up on port ' + port);
});

