import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const token = req.header("authorization");

  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ error: "Token is not valid" });
  }
}

export default authMiddleware;