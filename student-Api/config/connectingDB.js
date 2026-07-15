const mongoose = require('mongoose');

async function connetingDb(){
    try{
    await mongoose.connect("mongodb://127.0.0.1:27017/student-Api");
    console.log("mongoDb connecting succesfully");
    }catch(err){
        console.log("mongoDB give some err not connected",err);
    }
}
module.exports =connetingDb;
  
