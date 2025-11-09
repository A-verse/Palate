Palate

Your personal taste, perfected.

Palate is a smart, full-stack culinary assistant designed to help you discover, organize, and plan your meals. It goes beyond a simple recipe box by integrating AI to help generate new ideas and build weekly meal plans tailored to your personal goals and taste.



✨ Features

This project is a complete full-stack application built with a modern, professional tech stack.

Current Features

Secure User Authentication: Full sign-up, log-in, and log-out functionality using Supabase Auth.

Protected Routes: User-specific pages (like the dashboard, recipes, and planner) are fully protected by middleware.

Full Recipe CRUD: Complete "Create, Read, Update, & Delete" functionality for your personal recipe collection.

Dynamic Recipe Pages: A card-based "My Recipes" page and a detailed, dynamic page for viewing each individual recipe.

Interactive Meal Planner: A 7-day calendar view with a "recipe bank" sidebar.

Plan Management: Add recipes to specific days and meals (Breakfast, Lunch, Dinner) and see the calendar update in real-time.

Polished, Responsive UI: A modern, mobile-first design built with Tailwind CSS.



🚧 Planned Features (Roadmap)

AI Recipe Generation: A feature to generate new recipes from a text prompt using the Gemini API.

AI Meal Plan Generation: An "Auto-Plan" button to have the AI create a full week's meal plan based on your goals.

Recipe Image Uploads: Allow users to upload a main photo for each recipe.

Web Recipe Importer: A tool to paste a URL from a food blog and automatically scrape the recipe details.

Pantry Tracking: A feature to keep a digital inventory of your kitchen staples.



🛠️ Tech Stack

Framework: Next.js (App Router)

Database: Supabase (PostgreSQL)

Authentication: Supabase Auth

ORM: Prisma

Styling: Tailwind CSS

Animations: Framer Motion

Icons: Lucide React

AI (Planned): Google's Gemini API



🚀 Getting Started

To run this project locally, you will need to set up your own Supabase project and provide the necessary environment variables.

1. Prerequisites

Node.js (v18 or higher)

npm or yarn

A free Supabase account


2. Installation & Setup

Clone the repository:

git clone [https://github.com/YourUsername/palate.git](https://github.com/YourUsername/palate.git)
cd palate


Install dependencies:

npm install


Set up your Supabase Database:

Create a new project on Supabase.

Go to Project Settings > Database.

Find your Connection string (URI).

Set up Environment Variables:

Create a file named .env in the root of the project and add your database connection string. Prisma uses this.

DATABASE_URL="YOUR_SUPABASE_CONNECTION_STRING_URI"


Create a file named .env.local for your public-facing keys. You can find these in Project Settings > API.

NEXT_PUBLIC_SUPABASE_URL="YOUR_PROJECT_URL"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_PROJECT_ANON_KEY"


Push the Database Schema:

Run the Prisma db push command to sync your database with the schema.

npx prisma db push


Run the development server:

npm run dev


Open http://localhost:3000 in your browser to see the application.



📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
