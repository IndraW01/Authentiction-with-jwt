import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.get('authorization') && req.get('authorization').split(" ")[1];

  if (!token) {
    res.status(401).json({
      code: 401,
      status: 'Unautorized',
      errors: "Unautorized"
    });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SCREET_KEY);
      req.user = decoded;
      next();
    } catch (e) {
      next(e);
    }
  }
}