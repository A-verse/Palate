"use client";

import { motion } from "framer-motion";
import { ChefHat, Sparkles, BookOpen } from "lucide-react";

const features = [
  {
    name: "AI Recipe Generation",
    description: "Transform inspiration into culinary masterpieces. Our AI crafts sophisticated recipes tailored to your preferences and available ingredients.",
    icon: ChefHat,
  },
  {
    name: "Intelligent Planning",
    description: "Effortlessly orchestrate your weekly menu. Our AI curates balanced meal plans that align with your dietary goals and lifestyle.",
    icon: Sparkles,
  },
  {
    name: "Personal Collection",
    description: "Build your digital cookbook. Save, organize, and revisit your favorite recipes in a beautifully designed interface.",
    icon: BookOpen,
  },
];

export default function Features() {
  const CARD_VARIANTS = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="py-32 bg-gradient-to-b from-white via-cream-50 to-white">
      <div className="container-luxury">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-medium tracking-widest text-sage-600 uppercase mb-4"
          >
            Designed for Excellence
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-light tracking-tight text-charcoal-900"
          >
            Everything You Need to
            <span className="block font-semibold italic text-sage-700 mt-2">Master Your Culinary Journey</span>
          </motion.h2>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.name}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={CARD_VARIANTS}
              transition={{ delay: i * 0.15 }}
              className="group relative bg-white rounded-2xl p-8 border border-sage-100 hover:border-sage-200 hover:shadow-xl transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sage-100/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-sage-100 rounded-xl group-hover:bg-sage-600 transition-colors duration-500">
                  <feature.icon className="w-7 h-7 text-sage-600 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-charcoal-900">{feature.name}</h3>
                <p className="mt-4 text-charcoal-600 leading-relaxed font-light">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}