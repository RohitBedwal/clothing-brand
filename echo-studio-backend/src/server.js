import env from './config/env.js';
import app from './app.js';
import prisma from './config/database.js';

const server = app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION:', err.message);
  server.close(() => process.exit(1));
});

const gracefulShutdown = async (signal) => {
  console.log(`${signal} received. Shutting down gracefully...`);
  await prisma.$disconnect();
  server.close(() => process.exit(0));
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
