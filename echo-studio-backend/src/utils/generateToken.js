import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import prisma from '../config/database.js';
import env from '../config/env.js';

const ACCESS_TOKEN_EXPIRES = env.JWT_EXPIRES_IN || '15m';
const REFRESH_TOKEN_EXPIRES_DAYS = 30;

export const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, env.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES,
  });
};

export const generateRefreshToken = async (userId) => {
  const token = crypto.randomBytes(40).toString('hex');
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRES_DAYS * 24 * 60 * 60 * 1000);

  await prisma.refreshToken.create({
    data: { token, userId, expiresAt },
  });

  return { token, expiresAt };
};

export const sendTokenResponse = async (user, statusCode, res) => {
  const accessToken = generateAccessToken(user.id);
  const refreshToken = await generateRefreshToken(user.id);

  const isProduction = process.env.NODE_ENV === 'production';
  const isSecure = isProduction;

  const accessTokenOptions = {
    httpOnly: true,
    secure: isSecure,
    sameSite: isSecure ? 'none' : 'lax',
    maxAge: 15 * 60 * 1000,
    path: '/',
  };

  const refreshTokenOptions = {
    httpOnly: true,
    secure: isSecure,
    sameSite: isSecure ? 'none' : 'lax',
    maxAge: REFRESH_TOKEN_EXPIRES_DAYS * 24 * 60 * 60 * 1000,
    path: '/',
  };

  const { passwordHash, ...userWithoutPassword } = user;

  res
    .status(statusCode)
    .cookie('jwt', accessToken, accessTokenOptions)
    .cookie('refreshToken', refreshToken.token, refreshTokenOptions)
    .json({
      success: true,
      user: userWithoutPassword,
    });
};
