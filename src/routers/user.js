//jshint esversion:8

const express = require('express');
const router = new express.Router();
const User = require('../models/user');

router.post('/users', async (req, res)=>{
    const user = new User(req.body);
    try{
        await user.save();
       // const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        
        res.status(201).send({
            user: user,
            token: token
        });
    } catch(e){
        res.status(400).send(e);
    }
    
 
 
    // user.save().then(()=>{
    //     res.status(201).send(user);
    // }).catch((error)=>{
    //     res.status(400).send(error);                //Provide res.status() before res.send() always
    //     //res.send(error);
    // });
});

//Login route
router.post('/users/login', async (req, res)=>{
    try{
        
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({
            user: user, 
            token: token
        });
    }catch(e){
        res.status(400).send(e);
    }
});

//Reading multiple users
router.get('/users', async (req, res)=>{
   
   try{
       const users = await User.find({});
       res.status(200).send(users);
   }catch(e){
        res.status(500).send(e);
   }
   
    // User.find({}).then((users)=>{
    //     res.send(users);
    // }).catch((e)=>{
    //     res.status(500).send();
    // });
});

//Reading single user using id
router.get('/users/:id', async (req, res)=>{
    const _id = req.params.id;
    
    try{
        const user = await User.findById(_id);
        if(!user){
            return res.status(404).send();
        }
        res.status(200).send(user);
    }catch(e){
        res.status(500).send(e);
    }
    
    // User.findById(_id).then((user)=>{
    //     if(!user){
    //         return res.status(404).send();
    //     }
    //    res.send(user);
    // }).catch((e)=>{
    //     res.status(500).send();
    // });
});

//Updating users
router.patch('/users/:id', async (req, res)=>{
   const updates = Object.keys(req.body);
   const allowedUpdates = ['name', 'age', 'email', 'password'];
   const isValidOperation = updates.every((update)=> allowedUpdates.includes(update));
   if(!isValidOperation){
       return res.status(400).send({Error: 'Invalid updates!'});
   }
   
    try{
        const user = await User.findById(req.params.id);
        updates.forEach((update)=>{
            user[update] = req.body[update];
        });
        await user.save();
        
        
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!user){
            return res.status(404).send();
        }
        res.status(200).send(user);
    }catch(e){
        res.status(400).send(e);
    }
});

//Deleting users
router.delete('/users/:id', async(req, res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).send();
        }
            res.status(200).send(user);
    }catch(e){
        res.status(500).send(e);
    }
});

module.exports = router;