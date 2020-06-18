//jshint esversion:9

const express = require('express');
const router = new express.Router();
const Tasks = require('../models/task');
const auth = require('../middleware/authentication');


router.post('/tasks', auth, async (req, res)=>{
    //const task = new Tasks(req.body);
    const task = new Tasks({
        ...req.body,
        owner: req.user._id
    });
    try{
        await task.save();
        res.status(201).send(task);
    }catch(e){
        res.status(500).send(e);
    }
   
    // task.save().then(()=>{
    //     res.status(201).send(task);
    // }).catch((error)=>{
    //     res.status(400).send(error);
    // });
});

//Reading multiple tasks
router.get('/tasks', async (req, res)=>{
   try{
    const tasks = await Tasks.find({});
    res.status(200).send(tasks);
   }catch(e){
    res.status(500).send(e);
  }
   
    // Tasks.find({}).then((tasks)=>{
    //     res.send(tasks);
    // }).catch((e)=>{
    //     res.status(500).send();
    // });
});

//Reading single task using id
router.get('/tasks/:id', async (req, res)=>{
   const _id = req.params.id;
   
   try{
    const task = await Tasks.findById(_id);
    if(!task){
        res.status(404).send();
    }
    res.status(200).send(task);
   }catch(e){
    res.status(500).send(e);
   }
   
   //  Tasks.findById(_id).then((task)=>{
    //     if(!task){
    //         return res.status(404).send();
    //     }
    //     res.send(task);
    //  }).catch((e)=>{
    //     res.status(500).send();
    //  });
});

//Updating tasks
router.patch('/tasks/:id', async(req, res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['completed', 'description'];
    const isValidUpdate = updates.every((update)=> allowedUpdates.includes(update));
    if(!isValidUpdate){
        return res.status(400).send({Error: 'Invalid Updates!'});
    }

    try{
        const task = await Tasks.findById(req.params.id);
        updates.forEach((update)=> task[update] = req.body[update]);
        await task.save();
        
        
        //const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true});
        if(!task){
            return res.status(404).send();
        }
        res.status(200).send(task);
    }catch(e){
        res.status(500).send(e);
    }
});

//Delete tasks
router.delete('/tasks/:id', async(req, res)=>{
    try{
        const task = await Tasks.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(404).send();
        }
            res.status(200).send(task);
    }catch(e){
        res.status(500).send(e);
    }
});

module.exports = router;