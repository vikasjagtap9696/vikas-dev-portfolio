const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const supabase = require('../config/supabase');

// Verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.'
    });
  }
};

// Check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    const { data: userRole, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', req.user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (error || !userRole) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error checking admin status.'
    });
  }
};

// Combined middleware: verify token + check admin
const adminAuth = [verifyToken, isAdmin];

module.exports = {
  verifyToken,
  isAdmin,
  adminAuth
};
