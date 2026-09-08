import crypto from 'crypto';
import argon2 from 'argon2';
import prisma from '../config/database.js';
import { sendTokenResponse, generateAccessToken } from '../utils/generateToken.js';
import env from '../config/env.js';

export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists',
      });
    }

    const passwordHash = await argon2.hash(password);

    const user = await prisma.user.create({
      data: { firstName, lastName, email, phone, passwordHash },
    });

    await sendTokenResponse(user, 201, res);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isPasswordValid = await argon2.verify(user.passwordHash, password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    await sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No refresh token',
      });
    }

    const storedToken = await prisma.refreshToken.findUnique({
      where: { token },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      if (storedToken) {
        await prisma.refreshToken.delete({ where: { id: storedToken.id } });
      }
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token',
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: storedToken.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }

    await prisma.refreshToken.delete({ where: { id: storedToken.id } });

    const accessToken = generateAccessToken(user.id);
    const newRefreshToken = await prisma.refreshToken.create({
      data: {
        token: crypto.randomBytes(40).toString('hex'),
        userId: user.id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    const isProduction = process.env.NODE_ENV === 'production';

    const accessTokenOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 15 * 60 * 1000,
      path: '/',
    };

    const refreshTokenOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/',
    };

    res
      .status(200)
      .cookie('jwt', accessToken, accessTokenOptions)
      .cookie('refreshToken', newRefreshToken.token, refreshTokenOptions)
      .json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (refreshToken) {
      await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
    }

    const isProduction = process.env.NODE_ENV === 'production';
    const clearOptions = { httpOnly: true, path: '/' };
    if (isProduction) {
      clearOptions.secure = true;
      clearOptions.sameSite = 'none';
    }

    res
      .clearCookie('jwt', clearOptions)
      .clearCookie('refreshToken', clearOptions)
      .status(200)
      .json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No user found with this email',
      });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // TODO: Store hashedToken and expiry in DB once resetToken/resetTokenExpiry fields are added to User model

    res.status(200).json({
      success: true,
      message: 'Password reset token generated (email sending not yet implemented)',
      resetToken,
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // TODO: Implement once resetToken/resetTokenExpiry fields exist on User model

    res.status(501).json({
      success: false,
      message: 'Reset password not yet implemented — awaiting resetToken fields on User model',
    });
  } catch (error) {
    next(error);
  }
};
