import { Prisma } from '@prisma/client';

const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = [];

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002': {
        const target = err.meta?.target;
        statusCode = 409;
        message = `Duplicate value for field: ${Array.isArray(target) ? target.join(', ') : target}`;
        errors = [{ field: target, message }];
        break;
      }
      case 'P2025': {
        statusCode = 404;
        message = 'Record not found';
        errors = [{ message: err.meta?.cause || 'The requested resource does not exist' }];
        break;
      }
      case 'P2003': {
        statusCode = 400;
        message = 'Foreign key constraint failed';
        errors = [{ field: err.meta?.field_name, message: 'Related record does not exist' }];
        break;
      }
      case 'P2014': {
        statusCode = 400;
        message = 'Required relation violation';
        errors = [{ message: err.meta?.target || 'A required related record is missing' }];
        break;
      }
      default: {
        statusCode = 400;
        message = `Database error: ${err.code}`;
        errors = [{ message: err.message }];
        break;
      }
    }
  }

  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
    errors = [{ message: 'The provided token is invalid' }];
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
    errors = [{ message: 'Your session has expired, please log in again' }];
  }

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    errors = err.errors || [{ message: err.message }];
  }

  const response = {
    success: false,
    message,
    errors: errors.length > 0 ? errors : undefined,
  };

  if (process.env.NODE_ENV !== 'production') {
    response.stack = err.stack;
  }

  console.error(`[ERROR] ${statusCode} - ${message}`);
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  res.status(statusCode).json(response);
};

export default errorMiddleware;
