# Palate

Your personal taste, perfected. A MERN stack culinary assistant for recipe management, AI-powered discovery, and meal planning.

## Overview

Palate is a full-stack web application that helps users discover, save, and organize recipes. The platform features AI-assisted recipe generation, image upload to cloud storage, and an intuitive meal planning interface.

## Tech Stack

Frontend:
- React 18 with Vite
- React Router 7
- Axios HTTP client
- Tailwind CSS
- Framer Motion for animations

Backend:
- Express.js
- MongoDB with Mongoose
- JWT authentication
- Supabase Storage

Deployment:
- Netlify for frontend
- Render for backend
- MongoDB Atlas for database
- Supabase for object storage

## Architecture

MERN (MongoDB, Express, React, Node.js) monorepo structure:

```
palate/
├── client/                 # React frontend
│   ├── src/
│   ├── public/
│   ├── vite.config.js
│   └── netlify.toml
├── server/                 # Express backend
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
└── netlify.toml           # Monorepo deployment config
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- MongoDB (local or Atlas)
- Supabase account

### Installation

```bash
git clone https://github.com/A-verse/Palate.git
cd Palate
npm run install:all
```

### Environment Setup

Create `server/.env`:
```
PORT=5000
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/palate
JWT_SECRET=your_jwt_secret_here
SUPABASE_URL=https://ixqrucfraftqqttiubmg.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
FRONTEND_URL=http://localhost:5173
```

Create `client/.env`:
```
VITE_API_URL=http://localhost:5000/api
VITE_SUPABASE_URL=https://ixqrucfraftqqttiubmg.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_SUPABASE_BUCKET=recipes
```

### Running Locally

Terminal 1 - Backend:
```bash
cd server
npm run dev
```

Terminal 2 - Frontend:
```bash
cd client
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:5000

## Available Scripts

root:
- `npm run install:all` - Install dependencies
- `npm run dev:client` - Start frontend
- `npm run dev:server` - Start backend
- `npm run build:client` - Build frontend
- `npm run build:server` - Build backend

client/:
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Preview build

server/:
- `npm run dev` - Development server
- `npm run start` - Production server

## API

Base: `http://localhost:5000/api`

Auth:
- POST `/auth/register` - Create account
- POST `/auth/login` - Login
- GET `/auth/profile` - Current user

Recipes:
- GET `/recipes` - All recipes
- POST `/recipes` - Create
- GET `/recipes/:id` - Get recipe
- PUT `/recipes/:id` - Update
- DELETE `/recipes/:id` - Delete

Upload:
- POST `/upload` - Upload image
- DELETE `/upload/:path` - Delete image

## Deployment

Frontend (Netlify):
1. Push code to GitHub
2. Connect repository to Netlify
3. Set environment variables
4. Netlify auto-deploys on push

Backend (Render):
1. Create Web Service on Render
2. Connect GitHub repository
3. Configure environment variables
4. Start command: `npm start`

Database (MongoDB Atlas):
- Create cluster and user
- Use connection string in MONGO_URI

Storage (Supabase):
- Create bucket named "recipes"
- Configure RLS policies
- Add keys to environment

## Troubleshooting

Port in use (Windows):
```powershell
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

Port in use (macOS/Linux):
```bash
lsof -ti:5000 | xargs kill -9
```

MongoDB connection failed:
- Verify connection string
- Check MongoDB is running
- For Atlas, verify IP whitelist

Dependencies issue:
```bash
rm package-lock.json
npm install
```

## Development Notes

- Node 20+ required for both client and server
- Environment variables required for both frontend and backend
- JWT tokens stored in localStorage on client
- Images uploaded to Supabase Storage with UUID paths
- All API requests include JWT in Authorization header

## License

Private project.
