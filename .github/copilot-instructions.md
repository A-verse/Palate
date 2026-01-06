# Palate - Copilot Instructions

This document provides context, conventions, architecture, and visual guidelines for AI agents assisting with the **Palate** codebase.

## 🎯 Project Identity
* **App Name:** Palate
* **Tagline:** Your personal taste, perfected.
* **Core Mission:** A smart, full-stack culinary assistant for recipe management, AI-powered discovery, and intelligent meal planning.
* **Global Rename:** Ensure all visible text, metadata, and comments refer to the app as "**Palate**" (not NutriVerse).

## 🏗️ Project Architecture
* **Framework:** Next.js 14 (App Router)
* **Language:** JavaScript (ES6+)
* **Database:** PostgreSQL (via Supabase)
* **ORM:** Prisma
* **Auth:** Supabase Auth
* **Styling:** Tailwind CSS + Framer Motion
* **Icons:** Lucide React

## 🎨 Visual Style Guide (UI/UX)
* **Color Palette:**
    * **Primary:** Blue (`blue-600` for buttons/links, `blue-50` for backgrounds).
    * **Accent:** Indigo (`indigo-500` for gradients).
    * **Neutral:** Gray (`gray-50` for page bg, `gray-900` for headings, `gray-600` for body text).
    * **Feedback:** Red (`red-600`) for errors/deletes.
* **Typography:** `Inter` font (via `next/font/google`). Headings are bold/extrabold.
* **Shapes:**
    * **Buttons:** `rounded-lg` or `rounded-full` (for icons).
    * **Cards:** `rounded-xl` or `rounded-2xl` with `shadow-sm` hover: `shadow-lg`.
    * **Inputs:** `rounded-md` or `rounded-lg` with `focus:ring-2 focus:ring-blue-500`.
* **Animations:** Use `framer-motion` for smooth entry animations (fade-in, slide-up) on landing pages and complex transitions.
* **Layout:**
    * **Container:** `max-w-6xl mx-auto px-4`.
    * **Spacing:** Generous padding (`py-12`, `py-24`).
    * **Mobile First:** Always design for mobile (`flex-col`) then `md:flex-row`.

## 📱 Screen Design Guidelines

### 1. Landing Page (`localhost:3000`)
* **Hero Section:** Large banner with gradient text ("Intelligently"). Big "Get Started For Free" button with hover color change. Subtle grid pattern or animation in background.
* **Features Grid:** Three cards for "AI Recipe Gen", "Meal Planning", and "Community" features. Each with blue icon.
* **Final CTA:** Dark grey/black section at bottom with "Sign Up" button.

### 2. Login & Signup Screens
* **Center Card:** Clean white card centered on screen.
* **Logo:** "Palate" logo and tagline at top.
* **Inputs:** Email and Password fields with rounded borders. Blue border on focus.
* **Button:** Full-width blue button. Loading spinner on click.

### 3. Dashboard (Logged In)
* **Welcome Message:** Large heading "Welcome to your Dashboard" and user's email.
* **Clean Layout:** Simple for now, future: quick stats (e.g., "5 Recipes Saved").

### 4. My Recipes Page
* **Grid Layout:** Recipe list as cards in neat rows.
* **Recipe Card:**
  * **Top:** Recipe photo or placeholder icon.
  * **Middle:** Recipe name (bold) and short description.
  * **Bottom:** Prep time with clock icon and "View Recipe" button.
* **Add Button:** "Add New Recipe" button in top-right corner.

### 5. Add/Edit Recipe Form
* **Form Fields:** Clean inputs for Title, Description, Prep Time, etc.
* **Image Upload:** Large "Drag and drop" area for photo upload.
* **Dynamic Lists:** "Add Item" button for Ingredients and Instructions to add new lines.

### 6. Meal Planner
* **7-Day Grid:** Columns for Monday to Sunday.
* **Meal Slots:** Breakfast, Lunch, Dinner slots under each day.
* **Sidebar:** Right side with saved recipes list. "Add to Plan" button to add recipes to calendar.

## 📂 File Structure Conventions
* **`src/app`**: Contains all routes (App Router).
    * **`(auth)`**: Public auth pages (`login`, `signup`).
    * **`(main)`**: Protected app pages (`dashboard`, `recipes`, `planner`).
    * **`api/`**: Backend API routes (return JSON).
* **`src/components`**: Reusable UI components.
    * Client components MUST have `'use client'` at the very top.
* **`src/lib`**:
    * `supabase/client.js`: For browser-side auth/data.
    * `supabase/server.js`: For server-side (API/SSR) auth/data.

## 🔐 Authentication & Data Access
* **Middleware:** `middleware.js` protects routes.
* **Ownership Checks:** When updating/deleting data, **ALWAYS** verify `authorId === user.id` in the API route before proceeding.
* **Supabase Clients:** Use `createClient` from `@/lib/supabase/server` in API routes and Server Components. Use `@/lib/supabase/client` in Client Components (`useEffect`).

## 💾 Data Patterns (Prisma & Database)
* **JSON Fields:** `ingredients` and `instructions` are stored as `Json` in Postgres.
    * *Write:* Send as arrays of objects/strings.
    * *Read:* Parse safely on frontend.
* **Image Storage:**
    * **Bucket:** `recipe-images` (Supabase Storage).
    * **DB Field:** `Recipe.imageUrl` (String).
    * **Logic:** Upload file to bucket -> Get Public URL -> Save URL to Database.

## 🚧 Feature Specifications (Roadmap)

### 1. Image Upload (Priority)
* **UI:** Add file input to `NewRecipePage`. Preview image before upload.
* **Backend:** `POST /api/recipes` must accept `imageUrl`.

### 2. Web Scraper (Planned)
* **Input:** User pastes a URL.
* **Process:** Fetch HTML -> Extract structured JSON (Title, Ingredients, Instructions) -> Pre-fill the "Add Recipe" form.

### 3. AI Features (Gemini Integration)
* **Recipe Gen:** Prompt: "I have chicken and rice" -> AI returns structured JSON recipe.
* **Auto-Planner:** Prompt: "Plan a high-protein week" -> AI generates 21 meals and inserts into `MealPlan`.

## 🚫 Constraints (Do Not Do)
* **No `pages/` Directory:** We use App Router (`src/app`).
* **No Raw SQL:** Always use Prisma methods.
* **No `axios`:** Use native `fetch`.