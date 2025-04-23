import jwt from "jsonwebtoken";


// ✅ Verify Token Middleware
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded.userInfo;
      console.log(req.user);
      next();
    } catch (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
  };



  
// ✅ Verify Admin Middleware
export const verifyAdmin = async (req, res, next) => {
  try {
    console.log('User role from token:', req.user.role); // Log role here
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        status: "fail",
        data: { auth: "Access Denied. Admins only." }
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "An error occurred during admin verification.",
      data: { error: error.message }
    });
  }
};


