"use client";

import { motion } from "framer-motion";
import { BrainCircuit, CalendarHeart, Users } from "lucide-react";

const features = [
  {
    name: "AI Recipe Gen",
    description: "Unleash your creativity. Generate unique recipes from simple text prompts with our advanced AI.",
    icon: BrainCircuit,
  },
  {
    name: "Meal Planning",
    description: "Tell us your goals, and our AI will craft a perfect weekly meal plan from your recipe collection.",
    icon: CalendarHeart,
  },
  {
    name: "Community",
    description: "Explore a universe of flavors by browsing delicious recipes shared by other food lovers in the community.",
    icon: Users,
  },
];

export default function Features() {
  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
  };

  return (
    <div className="py-24 bg-white">
      <div className="container max-w-6xl px-4 mx-auto">
        <div className="text-center">
          <h2 className="text-base font-semibold tracking-wider text-blue-600 uppercase">Features</h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to master your meals
          </p>
        </div>
        <div className="grid gap-12 mt-12 md:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.name}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              variants={FADE_IN_ANIMATION_VARIANTS}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center p-8 text-center bg-gray-50 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center justify-center w-16 h-16 text-white bg-blue-500 rounded-full">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">{feature.name}</h3>
              <p className="mt-4 text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

