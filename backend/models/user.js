const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true,
        select : false
    },
    userType: {
        type: String,
        enum: ['admin', 'teamMember'],
        required: true,
    }
})

const userCollection = new mongoose.model("userCollection", userSchema)

module.exports = userCollection