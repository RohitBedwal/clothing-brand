import crypto from 'crypto';
import argon2 from 'argon2';
import prisma from '../config/database.js';
import { sendTokenResponse } from '../utils/generateToken.js';

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

    sendTokenResponse(user, 201, res);
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

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ success: true, message: 'Logged out successfully' });
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

    // Placeholder: generate reset token
    // In production, send this via email service
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // TODO: Store hashedToken and expiry in DB once resetToken/resetTokenExpiry fields are added to User model
    // await prisma.user.update({
    //   where: { id: user.id },
    //   data: {
    //     resetToken: hashedToken,
    //     resetTokenExpiry: new Date(Date.now() + 15 * 60 * 1000),
    //   },
    // });

    res.status(200).json({
      success: true,
      message: 'Password reset token generated (email sending not yet implemented)',
      resetToken, // Remove in production — only returned for development
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // TODO: Uncomment once resetToken/resetTokenExpiry fields exist on User model
    // const user = await prisma.user.findFirst({
    //   where: {
    //     resetToken: hashedToken,
    //     resetTokenExpiry: { gt: new Date() },
    //   },
    // });

    // if (!user) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Invalid or expired reset token',
    //   });
    // }

    // const passwordHash = await argon2.hash(password);
    // await prisma.user.update({
    //   where: { id: user.id },
    //   data: {
    //     passwordHash,
    //     resetToken: null,
    //     resetTokenExpiry: null,
    //   },
    // });

    // sendTokenResponse(user, 200, res);

    res.status(501).json({
      success: false,
      message: 'Reset password not yet implemented — awaiting resetToken fields on User model',
    });
  } catch (error) {
    next(error);
  }
};
