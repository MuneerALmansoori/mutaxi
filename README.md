# UberOps Admin Dashboard - Monorepo

## Project Overview
This is a production-grade Admin Dashboard for Uber-like operations. It features a full-stack architecture with RBAC, Audit Logging, Finance Modules, and RTL support.

## Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS 4, Recharts, Lucide Icons.
- **Backend**: Express (Node.js), Prisma ORM.
- **Database**: SQLite (via Prisma) - *Configured for easy migration to PostgreSQL*.
- **Auth**: JWT with RBAC (Roles & Permissions).

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
npx prisma generate
npx prisma db push
```

### 3. Seed Initial Data
Run the application and call the seed endpoint:
```bash
# Start the app
npm run dev
# In another terminal or browser
curl -X POST http://localhost:3000/api/v1/seed
```
*Default Credentials:*
- **Email**: `admin@uberops.com`
- **Password**: `admin123`

### 4. Development
```bash
npm run dev
```

## Project Structure
- `server.ts`: Express server with API routes and Vite middleware.
- `prisma/schema.prisma`: Database schema definition.
- `src/App.tsx`: Main React entry point with custom router.
- `src/pages/`: Dashboard, Users, Roles, and other module pages.
- `src/components/`: Reusable UI components and Layout.

## Key Features
- **RTL-First**: Designed for Arabic language by default.
- **RBAC Matrix**: Visual editor for role permissions.
- **Audit Logs**: Tracking every sensitive action.
- **Finance**: Wallet and Ledger system for transactions.
- **Ops Dashboard**: Live status and KPI tracking.
