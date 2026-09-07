import prisma from '../config/database.js';

export async function search(req, res, next) {
  try {
    const { q } = req.query;

    if (!q || q.trim().length === 0) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const searchTerm = q.trim();

    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } },
          {
            category: {
              name: { contains: searchTerm, mode: 'insensitive' },
            },
          },
          {
            collections: {
              some: {
                collection: {
                  name: { contains: searchTerm, mode: 'insensitive' },
                },
              },
            },
          },
        ],
      },
      include: {
        images: {
          where: { isPrimary: true },
          take: 1,
        },
        variants: {
          where: { isActive: true },
          orderBy: { price: 'asc' },
        },
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(products);
  } catch (error) {
    next(error);
  }
}
