"use client"; // This component uses animations, so it's a client component

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
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
            staggerChildren: 0.15,
          },
        },
      }}
      className="relative flex flex-col items-center justify-center min-h-[80vh] px-4 text-center"
    >
      <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <motion.h1
        variants={FADE_IN_ANIMATION_VARIANTS}
        className="z-10 max-w-4xl text-5xl font-bold tracking-tight text-gray-800 md:text-7xl"
      >
        Your Kitchen, Reimagined.
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
          Intelligently.
        </span>
      </motion.h1>

      <motion.p
        variants={FADE_IN_ANIMATION_VARIANTS}
        className="z-10 max-w-xl mx-auto mt-6 text-lg text-gray-600"
      >
        Palate is your personal taste, perfected. Generate unique recipes, plan your meals with AI, and discover a universe of flavors.
      </motion.p>

      <motion.div variants={FADE_IN_ANIMATION_VARIANTS} className="z-10 mt-8">
        <Link href="/signup" className="inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Get Started For Free
            <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </motion.div>
    </motion.div>
  );
}