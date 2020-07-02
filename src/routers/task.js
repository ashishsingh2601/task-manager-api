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
//GET /tasks?completed=true
//GET /tasks?limit=10&skip=0
//GET /tasks?sortBy=createdAt_desc
router.get('/tasks', auth, async (req, res)=>{
    const match = {};
    const sort = {};
        
    if(req.query.completed){
            match.completed = req.query.completed === 'true';
        }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split('_');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }
    
    try{
    //const tasks = await Tasks.find({ owner: req.user._id });
    await req.user.populate({
        path: 'tasks',
        match,
        options: {
            limit: parseInt(req.query.limit, 10),
            skip: parseInt(req.query.skip, 10),
            sort
        }
    }).execPopulate();
    res.status(200).send(req.user.tasks);
   }catch(e){
    res.status(500).send();
  }
   
    // Tasks.find({}).then((tasks)=>{
    //     res.send(tasks);
    // }).catch((e)=>{
    //     res.status(500).send();
    // });
});

//Reading single task using id
router.get('/tasks/:id', auth, async (req, res)=>{
   const _id = req.params.id;
   
   try{
    //const task = await Tasks.findById(_id);
    const task = await Tasks.findOne({
        _id,
        owner: req.user._id
    });
    if(!task){
        return res.status(404).send();
    }
    res.status(200).send(task);
   }catch(e){
    res.status(500).send();
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
router.patch('/tasks/:id', auth, async(req, res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['completed', 'description'];
    const isValidUpdate = updates.every((update)=> allowedUpdates.includes(update));
    if(!isValidUpdate){
        return res.status(400).send({Error: 'Invalid Updates!'});
    }

    try{
        const task = await Tasks.findOne({_id: req.params.id, owner: req.user._id});
        //const task = await Tasks.findById(req.params.id);
        //const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true});
        if(!task){
            return res.status(404).send();
        }
        updates.forEach((update)=> task[update] = req.body[update]);
        await task.save();
        res.status(200).send(task);
    }catch(e){
        res.status(500).send();
    }
});

//Delete tasks
router.delete('/tasks/:id', auth, async(req, res)=>{
    try{
        const task = await Tasks.findOneAndDelete({ _id: req.params.id, owner: req.user.id});
        //const task = await Tasks.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(404).send();
        }
            res.status(200).send(task);
    }catch(e){
        res.status(500).send();
    }
});

module.exports = router;