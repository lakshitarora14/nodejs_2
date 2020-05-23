const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('user',{
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("email is not valid")
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password must not contain the word password')
            }
        }
    },
    age:{
        type:Number,
        default: 0,
        validate(value){
            if(value<0){
                throw new Error('Age must be greater than 0')
            }
        }
    }
})

module.exports = User