import jwt from "jsonwebtoken";
export function authenticateUser(req, res, next) {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Deconded JWT : ", decoded);
    req.userId = decoded.userId;

    next();
  } catch (err) {
    console.log(err);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}
