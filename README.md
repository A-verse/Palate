# Palate

Your personal taste, perfected. A Next.js culinary assistant for recipe management, AI-powered discovery, and meal planning.

## Overview

Palate is a full-stack web application built with Next.js 14 that helps users discover, save, and organize recipes. The platform features AI-assisted recipe generation, image upload to cloud storage, and an intuitive meal planning interface.

## Tech Stack

- Next.js 14 with App Router
- React 18
- Prisma ORM with PostgreSQL
- Supabase Auth and Storage
- Tailwind CSS
- Framer Motion
- Lucide React icons

## Architecture

```
palate/
 app/
    (auth)/
       login/
       signup/
    (main)/
       dashboard/
       recipes/
       planner/
    api/
       recipes/
       meal-plans/
    layout.js
    page.js
    globals.css
 components/
 lib/
    supabase/
 prisma/
    schema.prisma
 public/
 middleware.js
```

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- Supabase account

### Installation

```bash
git clone https://github.com/A-verse/Palate.git
cd Palate
npm install
```

### Environment Setup

Create `.env.local`:

```
DATABASE_URL=postgresql://user:password@host:5432/palate
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Database Setup

```bash
npx prisma generate
npx prisma db push
```

### Development

```bash
npm run dev
```

Open http://localhost:3000

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## API Routes

### Recipes

- `POST /api/recipes` - Create recipe
- `GET /api/recipes` - List user recipes
- `PUT /api/recipes` - Update recipe
- `DELETE /api/recipes` - Delete recipe

### Meal Plans

- `POST /api/meal-plans/add` - Add meal to plan
- `POST /api/meal-plans/remove` - Remove meal from plan

## Deployment

### Vercel

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy

Vercel will automatically detect Next.js and configure the build.

### Environment Variables

Set these in Vercel:

- `DATABASE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Features

- User authentication via Supabase
- Recipe creation and management
- Image upload to Supabase Storage
- AI-powered recipe generation
- Weekly meal planning
- Responsive design

## Troubleshooting

### Database Connection

Ensure DATABASE_URL is correctly formatted and accessible from your deployment environment.

### Supabase Storage

Recipe images are stored in the 'recipes' bucket. Ensure the bucket exists and has proper RLS policies.

### Build Errors

If you encounter build errors, verify:
- All environment variables are set
- Prisma client is generated
- Node version is 20+
