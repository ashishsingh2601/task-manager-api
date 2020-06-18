//jshint esversion:8

const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next)=>{
//     console.log(req.method, req.path);
//     next();
// });

//Middleware setup for maintenance mode
// app.use((req, res, next)=>{
//     res.status(503).send('Site is currently down, check back soon!');
// });


app.use(express.json());                            //Configuring express to automatically parse the incoming JSON into object
app.use(userRouter);                                //Registering user router
app.use(taskRouter);                                //Registering task router


app.listen(port, ()=>{
    console.log('Server is up on port ' + port);
});

