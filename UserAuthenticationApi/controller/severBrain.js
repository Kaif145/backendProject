import User from "../module/userShecma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export async function registerUser(req, res) {
  try {
    const { userName, password, email, age, bio } = req.body;
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ messeges: "UserName is alread exists" });
    }
    const hasedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userName: userName,
      password: hasedPassword,
      email: email,
      age: age,
      bio: bio,
    });
    if (!newUser) {
      return res.json({ err: "someErr While building user" });
    }
    return res.status(201).json({
      user: newUser,
    });
  } catch (err) {
    console.log(err);
    res.json({ err: err });
  }
}
export async function login(req, res) {
  try {
    const { userName, password } = req.body;
    const findUsedByName = await User.findOne({ userName });

    if (!findUsedByName) {
      return res
        .status(404)
        .json({ messeges: "please Enter a viled userName" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      findUsedByName.password,
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({
        messeges: "Please enter a vailed password",
      });
    }

    const token = jwt.sign(
        {userId: findUsedByName._id},
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    );
    res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 60 * 60 * 1000
});

return res.json({
  message: "Login successful"
});
    
  } catch (err) {
    return res.json(err);
  }
}

export async function profile(req, res) {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    console.log(user);
    return res.status(200).json({
      user
    });
    

  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
}

export async function logout(req,res) {
  try{
    res.clearCookie("token");
    return res.json({
      message : "logout successful"
    });
  }catch(err){
    res.status(501).json(err);
  }
}