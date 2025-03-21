const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const verifyToken = require('../verifyToken')
const verifyUser = require('../verifyUser')

// GET METHOD
router.get('/', verifyToken, async(req,res) => {
    try {
        const users = await Post.find()
        res.send(users)
    }
    catch(err){
        res.status(400).send({message:err})
    }
  
})

// GET BY ID METHOD
router.get('/:id', verifyToken, async(req,res) => {
    try{
        const postById = await Post.findById(req.params.id)
        res.send(postById)
    }catch(err){
        res.send({message:err})
    }
})

// POST METHOD
router.post('/', verifyToken, async(req, res) =>{
    // save the data 
    const userId = req.user._id;
    const post = new Post({
        title:req.body.title, 
        description:req.body.description, 
        likes:req.body.likes, 
        createdBy:userId, 
    })
    try {
        const savedPost = await post.save()
        res.send(savedPost)
    } catch(err){
        res.status(400).send({message:err})
    }
})

// PUT METHOD
router.put('/:id', verifyUser, async(req, res) => {
    try {
        const updatePostById = await Post.findByIdAndUpdate(
            req.params.id, 
            {
                title: req.body.title, 
                description: req.body.description, 
                likes: req.body.likes, 
                createdBy: req.body.createdBy,
            },
            { new: true, runValidators: true } 
        );

        if (!updatePostById) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json(updatePostById);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// DELETE METHOD 
router.delete('/:id', verifyUser, async(req,res)=>{
    try{
        const deletePostById = await Post.findByIdAndDelete({_id:req.params.id})
        res.send(deletePostById)
    }catch(err){
        res.send({message:err})
    }
})

module.exports = router