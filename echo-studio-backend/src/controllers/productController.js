import prisma from '../config/database.js';

export const getProducts = async (req, res, next) => {
  try {
    const {
      category,
      collection,
      search,
      size,
      color,
      minPrice,
      maxPrice,
      availability,
      newArrival,
      sale,
      readyToShip,
      featured,
      sort,
      page = 1,
      limit = 20,
    } = req.query;

    const where = { isActive: true };

    if (category) {
      where.category = { slug: category };
    }

    if (collection) {
      where.collections = { some: { slug: collection } };
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } },
      ];
    }

    if (size || color) {
      where.variants = {
        some: {
          AND: [
            size ? { size } : {},
            color ? { color } : {},
          ].filter((c) => Object.keys(c).length > 0),
        },
      };
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    if (availability === 'true') {
      where.variants = {
        ...(where.variants || {}),
        some: {
          ...(where.variants?.some || {}),
          stock: { gt: 0 },
        },
      };
    }

    if (newArrival === 'true') where.isNewArrival = true;
    if (sale === 'true') where.isSale = true;
    if (readyToShip === 'true') where.isReadyToShip = true;
    if (featured === 'true') where.isFeatured = true;

    let orderBy = { createdAt: 'desc' };
    switch (sort) {
      case 'price_asc':
        orderBy = { price: 'asc' };
        break;
      case 'price_desc':
        orderBy = { price: 'desc' };
        break;
      case 'newest':
        orderBy = { createdAt: 'desc' };
        break;
      case 'name_asc':
        orderBy = { name: 'asc' };
        break;
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          images: { orderBy: { sortOrder: 'asc' } },
          variants: { where: { isActive: true } },
          category: true,
        },
        orderBy,
        skip,
        take: limitNum,
      }),
      prisma.product.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      products,
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    next(error);
  }
};

export const getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        images: { orderBy: { sortOrder: 'asc' } },
        variants: { where: { stock: { gt: 0 }, isActive: true } },
        category: true,
        collections: true,
      },
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: { orderBy: { sortOrder: 'asc' } },
        variants: { where: { isActive: true } },
        category: true,
      },
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, slug: providedSlug, ...productData } = req.body;

    const slug = providedSlug || name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const existingSlug = await prisma.product.findUnique({ where: { slug } });
    if (existingSlug) {
      return res.status(409).json({ success: false, message: 'A product with this slug already exists' });
    }

    const product = await prisma.product.create({
      data: { name, slug, ...productData },
      include: {
        images: true,
        variants: true,
        category: true,
      },
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const { name, slug, ...productData } = req.body;

    const updateData = { ...productData };
    if (name && !slug) {
      updateData.slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    if (slug) updateData.slug = slug;

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        images: true,
        variants: true,
        category: true,
      },
    });

    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { hard } = req.query;

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (hard === 'true') {
      await prisma.product.delete({ where: { id } });
      return res.status(200).json({ success: true, message: 'Product permanently deleted' });
    }

    await prisma.product.update({
      where: { id },
      data: { isActive: false },
    });

    res.status(200).json({ success: true, message: 'Product deactivated successfully' });
  } catch (error) {
    next(error);
  }
};
