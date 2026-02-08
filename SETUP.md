## Setup & Deployment Guide

### Local Development Setup

#### 1. Database Configuration

You need a PostgreSQL database. Options:

**Option A: Local PostgreSQL**
```bash
# Install PostgreSQL from https://www.postgresql.org/download/
# Create a database named "palate"
# Update DATABASE_URL in .env:
DATABASE_URL=postgresql://username:password@localhost:5432/palate
```

**Option B: PostgreSQL Cloud (Recommended)**
- Supabase: https://supabase.com (includes PostgreSQL)
- Neon: https://neon.tech
- Railway: https://railway.app
- Vercel Postgres: https://vercel.com/postgres

#### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual credentials:
```
DATABASE_URL=postgresql://user:password@host:port/database
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

#### 3. Initialize Database

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Create seed data
npx prisma db seed
```

#### 4. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

---

### Production Deployment (Vercel)

#### 1. Push Code to GitHub

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

#### 2. Deploy to Vercel

1. Go to https://vercel.com/import
2. Select your GitHub repository (A-verse/Palate)
3. Click "Import"
4. Configure project settings:
   - Framework: Next.js (auto-detected)
   - Root Directory: ./ (root)

#### 3. Set Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

```
DATABASE_URL=postgresql://user:password@host:port/database
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Make sure:
- DATABASE_URL is set for all environments (Production, Preview, Development)
- Database is accessible from Vercel (check IP whitelist for cloud databases)

#### 4. Database Setup

After deployment:

```bash
# Generate Prisma for production
npx prisma generate

# Deploy schema to production database
npx prisma db push --skip-generate
```

Or run once from Vercel CLI:
```bash
vercel env pull
npx prisma db push
```

#### 5. Deploy

Click "Deploy" in Vercel Dashboard. Vercel will automatically:
- Run `npm run build`
- Start `npm start`
- Monitor and auto-redeploy on pushes to main

---

### Troubleshooting

#### Database Connection Fails
- Verify DATABASE_URL format
- Check database credentials
- Ensure database is running (local) or accessible (cloud)
- For cloud databases, whitelist Vercel IPs if required

#### Prisma Client Generation Fails
```bash
rm -rf node_modules/.prisma
npx prisma generate
```

#### Supabase Configuration
- Visit https://supabase.com
- Create project, get URL and keys
- Add to `.env.local` and Vercel

#### Authentication Not Working
- Confirm NEXT_PUBLIC_SUPABASE_URL is correct
- Verify SUPABASE_SERVICE_ROLE_KEY in API routes (server-side)
- Check Supabase Row-Level Security (RLS) policies

---

### Useful Commands

```bash
npm run dev          # Development server
npm run build        # Production build
npm start            # Start production server
npx prisma studio   # 📊 View/edit database data
npx prisma migrate  # Database migrations
npx prisma reset    # ⚠️ Reset database (dev only)
```
