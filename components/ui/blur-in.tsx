"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface BlurIntProps {
  word: string;
  prevWord?: string;
  nextWord?: string;
  className?: string;
  variant?: {
    hidden: { filter: string; opacity: number };
    visible: { filter: string; opacity: number };
  };
  duration?: number;
}
const BlurIn = ({
  word,
  prevWord,
  nextWord,
  className,
  variant,
  duration = 2,
}: BlurIntProps) => {
  const defaultVariants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  const combinedVariants = variant || defaultVariants;

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      transition={{ duration }}
      variants={combinedVariants}
      className={cn(
        "font-bold text-6xl leading-[46px] text-center text-gray-200 drop-shadow-2xl lg:text-8xl ",
        className
      )}
    >
      <span className="mr-4 text-blue-600">{prevWord}</span>
      {word}
      <span className="ml-4 text-blue-600">{nextWord}</span>
    </motion.h1>
  );
};

export default BlurIn;
