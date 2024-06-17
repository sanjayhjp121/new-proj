const userCollection = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const setCookie = require("../utils/cookie")
const {ErrorHandler, errorMiddleware} = require("../middlewares/Error")


const register = async (req, res, next) => {
    try {
        const {email, password, userType} = req.body

        const user = await userCollection.findOne({email})

        if(user){
            return next(new ErrorHandler('user already exists', 409))
        }

        const hashed_password = await bcrypt.hash(password, 10)

        const created_user = await userCollection.create({email, password : hashed_password, userType})

        return setCookie(res, created_user, 201, `Registered successfully`)

    } catch (error) {
        next(new ErrorHandler(error.message, 500))
    }
}

const login = async (req,res, next) => {
    try {

        const {email, password} = req.body

        const user = await userCollection.findOne({email}).select('+password')

        if(!user){
            return next(new ErrorHandler('Invalid email or password', 404))
        }

        const password_match = await bcrypt.compare(password, user.password)

        if(password_match){
            return setCookie(res, user, 200, `Logged in successfully`)
        }  

        return next(new ErrorHandler('Invalid email or password', 404))
        
    } catch (error) {
        next(new ErrorHandler(error.message, 500))
    }
}

const logout = (req, res, next) => {
    try {
        res.status(200).cookie("token", "", {expires : new Date(Date.now()), 
        sameSite : process.env.NODE_ENV === "Development" ? "lax" : "none", 
        secure :   process.env.NODE_ENV === "Development" ? false : true
    }).json({
            success : true,
            message : "logged out"
        })
    } catch (error) {
        next(new ErrorHandler(error.message, 500))
    }
}

const getProfile = async (req, res, next) => {
    try {
        const profile = await userCollection.findById(req.user._id);

        if (!profile) {
            return next(new errorMiddleware("Profile not found", 404));
        }

        res.status(200).json({
            success: true,
            profile
        });
    } catch (error) {
        console.error(error);
        return next(new errorMiddleware("Internal Server Error", 500));
    }
};


module.exports = {register, login, logout, getProfile}