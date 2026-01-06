# Palate - Your Personal Taste, Perfected

Absolutely. **Palate** is a modern, full-stack web application designed to be your intelligent culinary assistant. It goes beyond a simple recipe book by integrating smart features to help you plan, cook, and organize your meals.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up the database:**
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key to `.env.local`
   - Run database migrations:
     ```bash
     npx prisma db push
     ```

3. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker

To run the app in a container:

```bash
docker build -t palate .
docker run -p 3000:3000 palate
```

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