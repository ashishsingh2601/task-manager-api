//jshint esversion:8

const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/authentication');

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

//Logout route
router.post('/users/logout', auth, async(req, res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    }catch(e){
        res.status(500).send(e);
    }
});

//LogoutAll route
router.post('/users/logoutAll', auth, async(req, res)=>{
    try{
        req.user.tokens = [];                   //Emptying the tokens array
        await req.user.save();
        res.send();
    }catch(e){
        res.status(500).send(e);
    }
});

//Reading users(single and multiple users)
router.get('/users/me', auth, async (req, res)=>{
   
    res.send(req.user);
//    try{
//        const users = await User.find({});
//        res.status(200).send(users);
//    }catch(e){
//         res.status(500).send(e);
//    }
   
    // User.find({}).then((users)=>{
    //     res.send(users);
    // }).catch((e)=>{
    //     res.status(500).send();
    // });
});

//Reading single user using id
// router.get('/users/:id', async (req, res)=>{
//     const _id = req.params.id;
    
//     try{
//         const user = await User.findById(_id);
//         if(!user){
//             return res.status(404).send();
//         }
//         res.status(200).send(user);
//     }catch(e){
//         res.status(500).send(e);
//     }
    
//     // User.findById(_id).then((user)=>{
//     //     if(!user){
//     //         return res.status(404).send();
//     //     }
//     //    res.send(user);
//     // }).catch((e)=>{
//     //     res.status(500).send();
//     // });
// });

//Updating users
router.patch('/users/me', auth, async (req, res)=>{
   const updates = Object.keys(req.body);
   const allowedUpdates = ['name', 'age', 'email', 'password'];
   const isValidOperation = updates.every((update)=> allowedUpdates.includes(update));
   if(!isValidOperation){
       return res.status(400).send({Error: 'Invalid updates!'});
   }
   
    try{
        //const user = await User.findById(req.params.id);
        updates.forEach((update)=>{
            req.user[update] = req.body[update];
        });
        await req.user.save();
        
        
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        // if(!user){
        //     return res.status(404).send();
        // }
        res.status(200).send(req.user);
    }catch(e){
        res.status(400).send(e);
    }
});

//Deleting users
router.delete('/users/me', auth, async(req, res)=>{
    try{
        // const user = await User.findByIdAndDelete(req.user._id);
        // if(!user){
        //     return res.status(404).send();
        // }
        await req.user.remove();
            res.status(200).send(req.user);
    }catch(e){
        res.status(500).send(e);
    }
});


const upload = multer({
    //dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, callback){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return callback(new Error('Invalid file type. Please, upload an image.'));
        }
        callback(undefined, true);
    }
});

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res)=>{
    req.user.avatar =  req.file.buffer;
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

router.delete('/users/me/avatar', auth, async(req, res)=>{
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
});

router.get('/users/:id/avatar', async(req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user || !user.avatar){
            throw new Error();
        }

        res.set('Content-Type', 'image/jpg');
        res.send(user.avatar);
    }catch(e){
        res.status(404).send();
    }
});



module.exports = router;