import prisma from '../config/database.js';

export const getCollections = async (req, res, next) => {
  try {
    const collections = await prisma.collection.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    res.json(collections);
  } catch (error) {
    next(error);
  }
};

export const getCollectionBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const collection = await prisma.collection.findUnique({
      where: { slug },
    });

    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        where: {
          collections: {
            some: { id: collection.id },
          },
          isActive: true,
        },
        include: {
          images: { take: 1 },
          variants: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({
        where: {
          collections: {
            some: { id: collection.id },
          },
          isActive: true,
        },
      }),
    ]);

    res.json({
      collection,
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createCollection = async (req, res, next) => {
  try {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { name, description, image } = req.body;

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const existing = await prisma.collection.findUnique({ where: { slug } });
    if (existing) {
      return res.status(409).json({ message: 'Collection with this name already exists' });
    }

    const collection = await prisma.collection.create({
      data: { name, slug, description, image },
    });

    res.status(201).json(collection);
  } catch (error) {
    next(error);
  }
};

export const updateCollection = async (req, res, next) => {
  try {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { id } = req.params;
    const { name, description, image, isActive } = req.body;

    const existing = await prisma.collection.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    const updateData = {};
    if (name) {
      updateData.name = name;
      updateData.slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    if (description !== undefined) updateData.description = description;
    if (image !== undefined) updateData.image = image;
    if (isActive !== undefined) updateData.isActive = isActive;

    const collection = await prisma.collection.update({
      where: { id },
      data: updateData,
    });

    res.json(collection);
  } catch (error) {
    next(error);
  }
};

export const deleteCollection = async (req, res, next) => {
  try {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { id } = req.params;

    const existing = await prisma.collection.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    const productCount = await prisma.product.count({
      where: {
        collections: {
          some: { id },
        },
      },
    });

    if (productCount > 0) {
      return res.status(400).json({
        message: `Cannot delete collection with ${productCount} product(s). Remove products first.`,
      });
    }

    await prisma.collection.delete({ where: { id } });

    res.json({ message: 'Collection deleted successfully' });
  } catch (error) {
    next(error);
  }
};
