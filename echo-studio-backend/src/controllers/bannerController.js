import prisma from '../config/database.js';

export const getBanners = async (req, res, next) => {
  try {
    const banners = await prisma.banner.findMany({
      where: { isActive: true },
      orderBy: { position: 'asc' },
    });
    res.status(200).json({ success: true, banners });
  } catch (error) {
    next(error);
  }
};

export const createBanner = async (req, res, next) => {
  try {
    const { title, subtitle, imageUrl, link, position } = req.body;
    const banner = await prisma.banner.create({
      data: { title, subtitle, imageUrl, link, position },
    });
    res.status(201).json({ success: true, banner });
  } catch (error) {
    next(error);
  }
};

export const updateBanner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, subtitle, imageUrl, link, position, isActive } = req.body;
    const banner = await prisma.banner.update({
      where: { id },
      data: { title, subtitle, imageUrl, link, position, isActive },
    });
    res.status(200).json({ success: true, banner });
  } catch (error) {
    next(error);
  }
};

export const deleteBanner = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.banner.delete({ where: { id } });
    res.status(200).json({ success: true, message: 'Banner deleted' });
  } catch (error) {
    next(error);
  }
};
