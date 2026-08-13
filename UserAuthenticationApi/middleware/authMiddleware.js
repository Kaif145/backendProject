import jwt from "jsonwebtoken";
export function authenticateUser(req, res,next){
    try{
        const authHeader = req.headers.authorizatoin;
        if(!authHeader) {
            return res.status(401).json({
                message: "no  token proied"
            });
        }
        const token = authHeader.split(" ")[1];
        const decond =jwt.verify(
            token,

            process.env.JWT_SECRET
        );
        req.userId = decond.userId;
        next();
    } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
}