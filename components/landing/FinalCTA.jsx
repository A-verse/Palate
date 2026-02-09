"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <div className="py-32 bg-gradient-to-br from-sage-700 via-sage-600 to-sage-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
           }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="container-luxury text-center relative z-10"
      >
        <h2 className="text-5xl md:text-6xl font-light text-white tracking-tight">
          Ready to Elevate
          <span className="block font-semibold italic mt-2">Your Culinary Experience?</span>
        </h2>
        <p className="max-w-2xl mx-auto mt-8 text-lg md:text-xl text-sage-100 font-light leading-relaxed">
          Join Palate today and discover a world of refined recipes, intelligent planning, and personalized culinary excellence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link 
            href="/signup" 
            className="group inline-flex items-center justify-center px-10 py-4 font-medium text-sage-700 bg-white rounded-lg hover:bg-cream-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            Begin Your Journey
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/login" 
            className="inline-flex items-center justify-center px-10 py-4 font-medium text-white bg-sage-800/50 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-sage-800/70 transition-all duration-300"
          >
            Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}