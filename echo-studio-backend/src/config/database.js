import { PrismaClient } from '@prisma/client';

const prismaOptions = {
  log: process.env.NODE_ENV !== 'production' ? ['warn'] : [],
  errorFormat: 'minimal',
};

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(prismaOptions);
} else {
  if (!globalThis.__prisma) {
    globalThis.__prisma = new PrismaClient(prismaOptions);
  }
  prisma = globalThis.__prisma;
}

export default prisma;
