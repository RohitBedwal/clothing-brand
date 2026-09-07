import prisma from '../config/database.js';

export const getProfile = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, phone } = req.body;

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { firstName, lastName, phone },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const getAddresses = async (req, res, next) => {
  try {
    const addresses = await prisma.address.findMany({
      where: { userId: req.user.id },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
    });

    res.status(200).json({ success: true, addresses });
  } catch (error) {
    next(error);
  }
};

export const createAddress = async (req, res, next) => {
  try {
    const { isDefault, ...addressData } = req.body;

    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId: req.user.id },
        data: { isDefault: false },
      });
    }

    const address = await prisma.address.create({
      data: { ...addressData, userId: req.user.id, isDefault: isDefault ?? false },
    });

    res.status(201).json({ success: true, address });
  } catch (error) {
    next(error);
  }
};

export const updateAddress = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.address.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }
    if (existing.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this address' });
    }

    const { isDefault, ...updateData } = req.body;

    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId: req.user.id },
        data: { isDefault: false },
      });
    }

    const address = await prisma.address.update({
      where: { id },
      data: { ...updateData, ...(isDefault !== undefined && { isDefault }) },
    });

    res.status(200).json({ success: true, address });
  } catch (error) {
    next(error);
  }
};

export const deleteAddress = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.address.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }
    if (existing.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this address' });
    }

    await prisma.address.delete({ where: { id } });

    res.status(200).json({ success: true, message: 'Address deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const setDefaultAddress = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.address.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }
    if (existing.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to modify this address' });
    }

    await prisma.address.updateMany({
      where: { userId: req.user.id },
      data: { isDefault: false },
    });

    const address = await prisma.address.update({
      where: { id },
      data: { isDefault: true },
    });

    res.status(200).json({ success: true, address });
  } catch (error) {
    next(error);
  }
};
