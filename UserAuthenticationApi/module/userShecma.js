import mongoose from "mongoose";

const userShecma = new mongoose.Schema({
    userName:{
        type : String,
        required  : true
    },
    email: {
        type:String,
    },
    age :{
        type:Number,
    },
    bio:{
        type:String,
    }
},{
    timestamps : true,
});

const User = mongoose.model("User", userShecma);

export default User;
