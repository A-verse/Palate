"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const FADE_IN = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.12,
          },
        },
      }}
      className="relative flex flex-col items-center justify-center min-h-[90vh] px-6 text-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-cream-50 via-cream-100 to-sage-50/30 -z-10" />
      
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235f7169' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
           }}
      />

      <motion.div variants={FADE_IN} className="mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage-100/50 border border-sage-200/50 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-sage-600" />
          <span className="text-sm font-medium text-sage-700">AI-Powered Culinary Assistant</span>
        </div>
      </motion.div>

      <motion.h1
        variants={FADE_IN}
        className="max-w-5xl text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-charcoal-900 leading-[1.1]"
      >
        Your Personal Taste,
        <br />
        <span className="font-semibold italic text-sage-700">
          Perfected.
        </span>
      </motion.h1>

      <motion.p
        variants={FADE_IN}
        className="max-w-2xl mx-auto mt-8 text-lg md:text-xl text-charcoal-600 font-light leading-relaxed"
      >
        Curate exquisite recipes, plan intelligent menus, and explore a world of refined flavors with AI-powered precision.
      </motion.p>

      <motion.div variants={FADE_IN} className="flex flex-col sm:flex-row gap-4 mt-12">
        <Link 
          href="/signup" 
          className="group inline-flex items-center justify-center px-8 py-4 font-medium text-white bg-sage-600 rounded-lg hover:bg-sage-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          Begin Your Journey
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link 
          href="/login" 
          className="inline-flex items-center justify-center px-8 py-4 font-medium text-sage-700 bg-white/80 backdrop-blur-sm border border-sage-200 rounded-lg hover:bg-white hover:border-sage-300 transition-all duration-300"
        >
          Sign In
        </Link>
      </motion.div>
    </motion.div>
  );
}