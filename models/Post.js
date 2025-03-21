const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    title: {
        type:String,
        required: true,
        max: 10, 
        },
    description: {
        type:String, 
        required: true,
        max: 500, 
        },
    likes: {
        type:Number, 
        required: true,
        default: 0
    },
    createdBy: {
        type:mongoose.Schema.Types.ObjectId, 
        ref: 'User',
    },
})

module.exports = mongoose.model('Post', PostSchema)