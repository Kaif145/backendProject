import User from "../module/userShecma.js";

export  async function registerUser(req,res){
try{
    const {userName,password,email,age,bio} = req.body;
    const newUser = await User.create({
        userName:userName,
        password:password,
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
export async function login(req,res) {
    try{
        const {userName,password} = req.body;
        const findUsedByName =await User.findOne({userName});

        if(!findUsedByName){
            return res.status(404).json({"messeges":"please Enter a viled userName"});
        }
        if(findUsedByName.password !== password){
            return res.status(404).json({"messeges":"please Enter a viled Password"});
        }
          res.json({"user": findUsedByName});  
        console.log(findUsedByName);

    }catch(err){
        return res.json(err);
    }
}
