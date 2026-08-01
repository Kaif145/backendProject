import User from "../module/userShecma.js";

export default async function registerUser(req,res){
try{
    const {userName,email,age,bio} = req.body;
    const newUser = await User.create({
        userName:userName,
        email:email,
        age:age,
        bio:bio
    });
    if(!newUser){
        return res.json({"err":"someErr While building user"});
    }
    return res.status(201).json({
      user: newUser});
}catch(err){
    console.log(err);
    res.json({"err" : err})
}
}
