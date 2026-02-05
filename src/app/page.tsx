"use client"

import { RizzInput } from "@/components/rizz-input";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Features } from "@/components/landing/features";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center gap-20">

      {/* Hero Section */}
      <div className="w-full flex flex-col items-center gap-12">
        <Hero />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-full flex justify-center z-20"
        >
          <RizzInput />
        </motion.div>
      </div>

      {/* Trust/Social Proof (Optional placeholder) */}

      {/* How It Works */}
      <HowItWorks />

      {/* Features */}
      <Features />

    </div>
  );
}
