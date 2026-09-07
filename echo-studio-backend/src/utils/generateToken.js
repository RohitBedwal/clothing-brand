import jwt from 'jsonwebtoken';
import env from '../config/env.js';

export const generateToken = (userId) => {
  return jwt.sign({ userId }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

export const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user.id);

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  const { passwordHash, ...userWithoutPassword } = user;

  res
    .status(statusCode)
    .cookie('jwt', token, cookieOptions)
    .json({
      success: true,
      token,
      user: userWithoutPassword,
    });
};
