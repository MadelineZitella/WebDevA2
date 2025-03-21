const express = require('express')
const router = express.Router()
const jsonwebtoken = require('jsonwebtoken')

const User = require('../models/User')
const {registerValidation, loginValidation} = require('../validations/validation')

const bcryptjs = require('bcryptjs')

router.post('/register', async(req, res) =>{
    // validation 1 to check user input 
    const {error} = registerValidation(req.body)
    if(error) {
        return res.status(400).send({message:error['details'][0]['message']})
    }

    // validation 2 to check is user already exists 
    // if user exists, we don't want a duplicate 
    const userExists = await User.findOne({email:req.body.email})
    if(userExists){
        return res.status(400).send({message:'User already exists'})
    }

    // hashed representation of the password 
    const salt = await bcryptjs.genSalt(5) // complexity of hash 
    const hashedPassword = await bcryptjs.hash(req.body.password, salt)


    // save the data 
    const user = new User({
        name:req.body.name, 
        email:req.body.email, 
        password:hashedPassword
    })
    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch(err){
        res.status(400).send({message:err})
    }

})

router.post('/login', async(req, res) =>{
    // validation 1 to check user input 
    const {error} = loginValidation(req.body)
    if(error) {
        return res.status(400).send({message:error['details'][0]['message']})
    }

    // validation 2 check if user exists 
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).send({message:'User does not exist'})
    }

    // validation 3 check user password 
    const passwordValidation = await bcryptjs.compare(req.body.password, user.password)
    if (!passwordValidation){
        return res.status(400).send({message:'Password is incorrect'})
    }
    // generate an auth token for the user 
    const token = jsonwebtoken.sign({_id:user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send({'auth-token':token})
})
module.exports=router
