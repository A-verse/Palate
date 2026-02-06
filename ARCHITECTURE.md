# Palate - Project Architecture

## ⚠️ IMPORTANT: This is a MERN Stack Application

**This repository contains:**
- ✅ **`/client`**: React 18 + Vite frontend (ACTIVE)
- ✅ **`/server`**: Express + MongoDB backend (ACTIVE)
- ❌ **Root Next.js files**: LEGACY/UNUSED (ignore `package.json`, `next.config.js`, etc. in root)

---

## 🏗️ Architecture

```
Palate/
├── client/              ✅ Frontend (React + Vite)
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── server/              ✅ Backend (Express + MongoDB)
│   ├── routes/
│   ├── models/
│   ├── package.json
│   └── server.js
│
└── package.json         ❌ IGNORE (Next.js - unused)
```

---

## 🚀 How to Start the Application

### Option 1: Run Both Simultaneously (Recommended)

**Terminal 1 - Backend:**
```bash
cd server
npm install
npm run dev
# Runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm install
npm run dev
# Runs on http://localhost:5173
```

### Option 2: Use Root Scripts (if configured)

```bash
# From root directory
npm run dev:server    # Start Express backend
npm run dev:client    # Start React frontend
npm run dev:both      # Start both concurrently
```

---

## 📋 Default Ports

| Service | Port | URL |
|---------|------|-----|
| **Frontend (Vite)** | 5173 | http://localhost:5173 |
| **Backend (Express)** | 5000 | http://localhost:5000 |
| **MongoDB** | 27017 | mongodb://localhost:27017 (if local) |

---

## 🚨 Troubleshooting: "EADDRINUSE" Error

### Error Message:
```
Error: listen EADDRINUSE: address already in use :::3000
```

### Cause:
Something is already using the port (likely a zombie process).

### Solutions:

#### Windows (PowerShell):
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process by PID (replace 1234 with actual PID)
taskkill /PID 1234 /F
```

#### macOS/Linux:
```bash
# Find and kill process using port 3000
lsof -ti:3000 | xargs kill -9
```

#### Change Port (Alternative):
```bash
# Backend (server/.env)
PORT=5001

# Frontend (automatically uses next available port)
# Vite will prompt: "Port 5173 is in use, use 5174 instead? (Y/n)"
```

---

## 🔧 Environment Variables

### Backend (`server/.env`)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/palate
JWT_SECRET=your_jwt_secret_here
SUPABASE_URL=https://ixqrucfraftqqttiubmg.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
FRONTEND_URL=http://localhost:5173
```

### Frontend (`client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
VITE_SUPABASE_URL=https://ixqrucfraftqqttiubmg.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_SUPABASE_BUCKET=recipes
```

---

## 🎯 Deployment

- **Frontend**: Deploy to **Netlify** (see `NETLIFY_DEPLOYMENT.md`)
- **Backend**: Deploy to **Render** (see `DEPLOYMENT_CHECKLIST.md`)
- **Database**: MongoDB Atlas (cloud)
- **Storage**: Supabase Storage

---

## ❌ What NOT to Do

1. **DO NOT** run `npm install` in the root directory (Next.js dependencies are unused)
2. **DO NOT** run `npm run dev` from root (will try to start Next.js)
3. **DO NOT** use port 3000 (reserved by old Next.js config)
4. **DO NOT** deploy as a Next.js app (this is MERN)

---

## ✅ Correct Workflow

1. Always work inside `/client` or `/server` directories
2. Run backend on port 5000 (Express)
3. Run frontend on port 5173 (Vite)
4. Backend API routes are accessed via `/api` prefix
5. Frontend proxies API calls to `http://localhost:5000/api` in dev

---

## 📚 Documentation

- [Netlify Deployment Guide](NETLIFY_DEPLOYMENT.md)
- [Full Deployment Checklist](DEPLOYMENT_CHECKLIST.md)
- [Copilot Instructions](.github/copilot-instructions.md)

---

**Last Updated**: February 7, 2026
