import mongoose,{Schema} from "mongoose";
import  jwt from "jsonwebtoken"  /// what this line tells-->>"Hey, I want to use a tool called jsonwebtoken to help me work with tokens."

// what is token---->>>.A token is like a secret pass or ID card. It proves who you are when you visit a website or use an app.

import bcrypt from "bcrypt"   ///password koh encrypt krne kh liya which is necessary for data 

const userSchema=new Schema({
    username:{
        type:String,
        unique:true,
        lowercase:true,
        required:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        required:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String,  ///cloidinary URL
        required:true,
    },
    
    coverImage:{
        type:String,  ///cloidinary URL
    },
    watchHistory:{
        type:Schema.Types.ObjectId,
        ref:"Videos"
    },
    passsword:{
        type:String,
        required:[true,"Password is required"]
    },
    refreshTokens:{
        type:String,
    }
},
    {
        timestamps:true
    }
);

//yha pr password encrypt ho rha ha..........aur if mh yh check ho rha ha ki user passwrod change krna aya ha kya??  agar ha toh change hoga warna return ho jaye gh..

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
        this.passsword=bcrypt.hash(this.passsword,10)
        next()
})

// Method is created to check the user password with its owns password
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.passsword)
}

userSchema.methods.generateAccessTokens=function(){
    return jwt.sign(
        {
        _id:this._id,
        email:this.email,
        username:this.userSchema,
        fullname:this.fullname
    },
    process.env.generateACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
        
   )
}
userSchema.methods.
generateRefreshTokens=function(){return jwt.sign(
        {
        _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
        
   )}
export const User=mongoose.model("User",userSchema)