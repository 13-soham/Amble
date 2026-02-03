const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength : 2,
        maxLength : 20
    },
    lastName: {
        type: String,
        maxLength : 50
    },
    age: {
        type: Number,
        min : 18,
        max : 100,
        required : true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error("Invalid Email");
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        // enum: ["male", "female", "other"]
        validate(val){
            if(!["male", "female", "others"].includes(val)){
                throw new Error("Gender is not valid");
            }
        },
    },
    about: {
        type: String,
        default: "hey! I am using Amble",
        maxLength : 100
    },
    interest: {
        type: [String]
    },
    photoUrl: {
        type: String,
        default: "https://plus.unsplash.com/premium_vector-1682269282372-6d888f3451f1?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        validate(val){
            if(!validator.isURL(val)){
                throw new Error("Invalid Photo URL");
            }
        }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isPremium : {
        type : Boolean,
        default : false
    }


}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = { User };