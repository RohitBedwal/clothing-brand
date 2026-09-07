# ECHO STUDIO Backend

REST API backend for the ECHO STUDIO fashion e-commerce platform.

## Tech Stack

- Node.js + Express.js
- PostgreSQL (Supabase)
- Prisma ORM
- JWT (HTTP-only cookies)
- bcrypt/argon2 password hashing
- Zod validation
- Helmet security
- CORS

## Architecture

```
echo-studio-frontend → echo-studio-backend → Supabase PostgreSQL
echo-studio-admin   → echo-studio-backend → Supabase PostgreSQL
```

## Requirements

- Node.js >= 18
- PostgreSQL database (Supabase recommended)

## Installation

```bash
cd echo-studio-backend
npm install
```

## Environment Variables

Copy `.env.example` to `.env` and fill in:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string (with pooling) |
| `DIRECT_URL` | Direct database connection |
| `JWT_SECRET` | Secret for JWT signing |
| `FRONTEND_URL` | Customer frontend URL |
| `ADMIN_FRONTEND_URL` | Admin frontend URL |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `RAZORPAY_KEY_ID` | Razorpay key ID |
| `RAZORPAY_KEY_SECRET` | Razorpay key secret |
| `EMAIL_*` | Email service credentials |

## Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed sample data
npx prisma db seed
```

## Start Development Server

```bash
npm run dev
```

Server runs on http://localhost:5000

## Production Build

```bash
npm run build
npm start
```

## API Structure

Base URL: `/api`

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/forgot-password` | Request password reset |
| POST | `/api/auth/reset-password` | Reset password |

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List with filters (category, collection, search, sort, pagination) |
| GET | `/api/products/:slug` | Product detail |

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | List all categories |
| GET | `/api/categories/:slug` | Category detail |

### Collections

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/collections` | List all collections |
| GET | `/api/collections/:slug` | Collection detail |

### Cart (auth required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get cart |
| POST | `/api/cart/items` | Add item to cart |
| PUT | `/api/cart/items/:id` | Update cart item |
| DELETE | `/api/cart/items/:id` | Remove cart item |
| DELETE | `/api/cart` | Clear cart |

### Wishlist (auth required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/wishlist` | Get wishlist |
| POST | `/api/wishlist/:productId` | Add to wishlist |
| DELETE | `/api/wishlist/:productId` | Remove from wishlist |

### Orders (auth required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create order |
| GET | `/api/orders` | List user orders |
| GET | `/api/orders/:id` | Order detail |
| POST | `/api/orders/:id/cancel` | Cancel order |

### Addresses (auth required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/addresses` | List addresses |
| POST | `/api/addresses` | Add address |
| PUT | `/api/addresses/:id` | Update address |
| DELETE | `/api/addresses/:id` | Delete address |
| PUT | `/api/addresses/:id/default` | Set default address |

### Reviews

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reviews/product/:productId` | List product reviews |
| POST | `/api/reviews/product/:productId` | Add review (auth required) |

### Payments (auth required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payments/create` | Create payment |
| POST | `/api/payments/verify` | Verify payment |
| POST | `/api/payments/webhook` | Razorpay webhook |

### Coupons

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/coupons/validate` | Validate coupon (auth required) |

### Search

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/search?q=query` | Search products |

### Shipping

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/shipping/methods` | List shipping methods |
| POST | `/api/shipping/calculate` | Calculate shipping cost (auth required) |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |

### Admin Routes

All `/api/admin/*` routes require `ADMIN` role.

## Authentication

- JWT tokens stored in HTTP-only cookies
- No localStorage tokens
- Cookie name: `jwt`
- Token expires per `JWT_EXPIRES_IN` env var

## Frontend Integration

The customer frontend should:

1. Make API requests with `credentials: 'include'`
2. Read cart/wishlist from API instead of localStorage
3. Replace localStorage auth with API auth

## Default Users (after seeding)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@echostudio.in | admin123 |
| Customer | customer@echostudio.in | customer123 |
