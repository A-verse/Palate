"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <div className="py-24 bg-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="container max-w-4xl px-4 mx-auto text-center"
      >
        <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
          Ready to transform your kitchen?
        </h2>
        <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-300">
          Join Palate today and start your journey towards smarter, more delicious meal planning.
        </p>
        <div className="mt-10">
          <Link href="/signup" className="inline-flex items-center justify-center px-10 py-4 font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Sign Up for Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
