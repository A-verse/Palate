# Palate - Your Personal Taste, Perfected

**A modern MERN stack culinary assistant for recipe management, AI-powered discovery, and intelligent meal planning.**

---

## ⚠️ IMPORTANT: Project Architecture

**This is a MERN Stack application, NOT Next.js.**

The repository structure:
- ✅ **`/client`** - React 18 + Vite frontend (ACTIVE)
- ✅ **`/server`** - Express + MongoDB backend (ACTIVE)  
- ❌ **Root Next.js files** - LEGACY/UNUSED

**📖 Read [ARCHITECTURE.md](ARCHITECTURE.md) for complete setup instructions.**

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Supabase account (for image storage)

### Setup

**1. Install dependencies for both client and server:**
```bash
# From root directory
npm run install:all

# OR manually:
cd client && npm install
cd ../server && npm install
```

**2. Configure environment variables:**

**Backend** (`server/.env`):
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/palate
JWT_SECRET=your_secret_key_here
SUPABASE_URL=https://ixqrucfraftqqttiubmg.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
FRONTEND_URL=http://localhost:5173
```

**Frontend** (`client/.env`):
```env
VITE_API_URL=http://localhost:5000/api
VITE_SUPABASE_URL=https://ixqrucfraftqqttiubmg.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_SUPABASE_BUCKET=recipes
```

**3. Start the application:**

Open **two terminals**:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
# → http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
# → http://localhost:5173
```

**4. Open in browser:**  
Visit [http://localhost:5173](http://localhost:5173)

---

## 🚨 Troubleshooting

### "EADDRINUSE: address already in use"

**Windows (PowerShell):**
```powershell
# Find process on port 5000 (backend)
netstat -ano | findstr :5000

# Kill it (replace PID)
taskkill /PID 1234 /F
```

**macOS/Linux:**
```bash
lsof -ti:5000 | xargs kill -9
```

### Port conflicts?
Change the port in `server/.env`:
```env
PORT=5001
```

---

## 📚 Documentation

- [**ARCHITECTURE.md**](ARCHITECTURE.md) - Full project structure and startup guide
- [**NETLIFY_DEPLOYMENT.md**](NETLIFY_DEPLOYMENT.md) - Deploy frontend to Netlify
- [**DEPLOYMENT_CHECKLIST.md**](DEPLOYMENT_CHECKLIST.md) - Full production deployment

---

## Project Structure

```
src/
├── app/                          # Next.js 14 App Router
│   ├── (auth)/                   # Public authentication routes
│   │   ├── login/
│   │   └── signup/
│   ├── (main)/                   # Protected app routes
│   │   ├── dashboard/
│   │   ├── recipes/              # Recipe management
│   │   │   ├── page.js           # Recipe list
│   │   │   ├── new/              # Create recipe form
│   │   │   └── [id]/             # Recipe details
│   │   └── planner/              # Meal planning
│   ├── api/                      # API routes
│   │   ├── recipes/              # Recipe CRUD operations
│   │   └── meal-plans/           # Meal plan management
│   ├── layout.js                 # Root layout
│   ├── page.js                   # Landing page
│   └── globals.css
├── components/                   # Reusable UI components
│   ├── Header.jsx
│   ├── RecipeCard.jsx
│   ├── MealPlanner.jsx
│   ├── LogoutButton.jsx
│   └── landing/                  # Landing page components
└── lib/                          # Utilities
    └── supabase/
        ├── client.js             # Browser-side Supabase client
        └── server.js             # Server-side Supabase client

prisma/
└── schema.prisma                 # Database schema (PostgreSQL)

middleware.js                      # Route protection middleware
```

## API Endpoints

### Recipes
- `GET /api/recipes` - Fetch all recipes for the authenticated user
- `POST /api/recipes` - Create a new recipe
  - Body: `{ title, description, prepTime, cookTime, ingredients, instructions, imageUrl }`

### Meal Plans
- `POST /api/meal-plans/add` - Add a recipe to the meal plan
  - Body: `{ recipeId, day, mealType }`
- `POST /api/meal-plans/remove` - Remove a recipe from the meal plan
  - Body: `{ mealPlanId }`

## Roadmap / Planned Features

- **Image Upload** - Users can upload recipe photos directly from the recipe form (Supabase Storage integration)
- **Web Scraper** - Extract recipe data from URLs and auto-fill the recipe form
- **AI Recipe Generation** - Use Gemini API to generate recipes based on available ingredients
- **Smart Meal Planning** - AI-powered weekly meal planner with nutritional recommendations
- **Community Features** - Share recipes and meal plans with other users
- **Advanced Search** - Filter recipes by cuisine, dietary restrictions, prep time, etc.

Here is a breakdown of what the website is, its core features, and the technology powering it.

## 1. Core Concept: What is Palate?

Think of Palate as a **"Smart Kitchen OS."**
It solves three main problems for home cooks:

* **"What should I cook?"** (Discovery & Storage)
* **"How do I organize my week?"** (Meal Planning)
* **"How do I keep track of my own recipes?"** (Digital Recipe Box)

## 2. Key Features (What Users Can Do)

* **Smart Recipe Management (The "Digital Cookbook"):**
  * **Create:** Users can add their own recipes with titles, descriptions, prep/cook times, ingredients, and step-by-step instructions.
  * **Upload Photos:** Users can upload beautiful images of their dishes (powered by Cloud Storage).
  * **Organize:** All recipes are saved in a personal, searchable library.

* **Intelligent Meal Planner:**
  * **Visual Calendar:** A drag-and-drop style 7-day planner (Mon-Sun).
  * **Schedule Meals:** Users can assign specific recipes to Breakfast, Lunch, or Dinner slots for any day of the week.
  * **Real-time Updates:** Adding a meal instantly updates the schedule.

* **Secure User Accounts:**
  * **Personalized Experience:** Every user has their own private dashboard, recipe collection, and meal plan.
  * **Security:** Data is protected, and users can only edit or delete their own content.

## 3. The Technology Stack (Under the Hood)

Palate is built using the most modern, industry-standard tools available in 2024/2025. This makes it fast, secure, and scalable.

* **Frontend (The Visuals):**
  * **Next.js 14 (App Router):** The framework that powers the entire app, making it incredibly fast and SEO-friendly.
  * **Tailwind CSS:** Used for all the styling (colors, layout, responsiveness). It ensures the app looks great on mobile phones and desktops.
  * **Framer Motion:** Adds smooth animations (like fade-ins on the homepage) to make the app feel premium.
  * **Lucide React:** Provides the clean, modern icons you see throughout the app.

* **Backend (The Brains):**
  * **Supabase:** This is our "Backend-as-a-Service." It handles:
    * **Database (PostgreSQL):** Stores all the user data, recipes, and meal plans securely in the cloud.
    * **Authentication:** Manages the secure login/signup system.
    * **Storage:** Stores the recipe images uploaded by users.
  * **Prisma ORM:** A tool that lets our code talk to the database easily and safely, preventing errors.

## 4. User Journey (How it Works)

1. **Landing Page:** A visitor arrives at `palate.com` (or localhost). They see a beautiful hero section explaining the app.
2. **Sign Up:** They click "Get Started," enter their email/password, and a secure account is created instantly.
3. **Dashboard:** They are redirected to their personal dashboard.
4. **Add Recipe:** They click "Add Recipe," type in "Grandma's Lasagna," upload a photo, and hit save.
5. **Plan:** They go to the "Meal Planner," see their Lasagna in the sidebar, and add it to "Sunday Dinner."

In short, **Palate is a professional-grade, cloud-native application** that showcases advanced full-stack development skills.