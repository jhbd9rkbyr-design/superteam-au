"use client";
import { FC, ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  text: string;
  className?: string;
  /** First word index to apply gradient (inclusive) */
  gradientFromWord?: number;
  /** Last word index to apply gradient (exclusive). If omitted, gradient goes to end. */
  gradientToWord?: number;
}

const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
  gradientFromWord,
  gradientToWord,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "start 0.2"],
  });
  const words = text.split(" ");

  const hasGradient = gradientFromWord !== undefined;
  const gFrom = gradientFromWord ?? 0;
  const gTo = gradientToWord ?? words.length;

  return (
    <div ref={containerRef} className={cn("relative z-0", className)}>
      <p
        className="flex flex-wrap text-2xl font-bold text-[#141E14]/15 md:text-3xl lg:text-4xl xl:text-5xl max-w-4xl mx-auto leading-snug"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          const isGradient = hasGradient && i >= gFrom && i < gTo;
          return (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[start, end]}
              gradient={isGradient}
            >
              {word}
            </Word>
          );
        })}
      </p>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  gradient?: boolean;
}

const Word: FC<WordProps> = ({ children, progress, range, gradient }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  if (gradient) {
    return (
      <span className="xl:lg-3 relative mx-1 lg:mx-2.5">
        <span className="absolute opacity-30">{children}</span>
        <motion.span
          style={{ opacity }}
          className="bg-gradient-to-r from-[#F9CC01] via-[#68BD88] to-[#00833F] bg-clip-text text-transparent"
        >
          {children}
        </motion.span>
      </span>
    );
  }

  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-2.5">
      <span className="absolute opacity-30">{children}</span>
      <motion.span style={{ opacity }} className="text-[#141E14]">
        {children}
      </motion.span>
    </span>
  );
};

export { TextRevealByWord };
