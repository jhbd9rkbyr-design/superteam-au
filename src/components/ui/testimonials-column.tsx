"use client";

import React from "react";
import { motion } from "framer-motion";
import { Tweet } from "react-tweet";

export function TestimonialsColumn({
  className,
  tweetIds,
  duration = 10,
}: {
  className?: string;
  tweetIds: string[];
  duration?: number;
}) {
  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-4 pb-4"
      >
        {/* Duplicate the list so the loop is seamless */}
        {[0, 1].map((copy) => (
          <React.Fragment key={copy}>
            {tweetIds.map((id) => (
              <div key={`${copy}-${id}`} className="tweet-embed-compact" data-theme="dark">
                <Tweet id={id} />
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}
