import jwt from "jsonwebtoken";
export function authenticateUser(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    console.log("Authorization:", authHeader);

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    console.log("Deconded JWT : ",decoded);
    req.userId = decoded.userId;

    next();

  } catch (err) {
    console.log(err);

    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
}