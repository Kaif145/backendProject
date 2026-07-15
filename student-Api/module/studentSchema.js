const mongoose  = require("mongoose");

const studentSH =new mongoose.Schema({
    studentName:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    studentclass:{
        type:Number,
        required:true
    },
    rollNo:{
        type:Number
    },
    mark:{
        type : Number
    },
    email:{
        type:String
    },
    phone:{
        type:Number
    },
    address:{
        type:String
    }
},{
    timestamps: true
});

const StudentsData = mongoose.model("StudentsData",studentSH);

module.exports = StudentsData;

