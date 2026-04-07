"use client"

import React, { useCallback, useMemo, useRef } from "react"
import { motion, useAnimationControls } from "framer-motion"
import { v4 as uuidv4 } from "uuid"
import { cn } from "@/lib/utils"
import { useDimensions } from "@/components/hooks/use-debounced-dimensions"

interface PixelTrailProps {
  pixelSize: number // px
  fadeDuration?: number // ms
  delay?: number // ms
  className?: string
  pixelClassName?: string
}

const PixelTrail: React.FC<PixelTrailProps> = ({
  pixelSize = 20,
  fadeDuration = 500,
  delay = 0,
  className,
  pixelClassName,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const dimensions = useDimensions(containerRef)
  const trailId = useRef(uuidv4())
  const lastMouse = useRef<{ x: number; y: number } | null>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      const x = Math.floor(mx / pixelSize)
      const y = Math.floor(my / pixelSize)

      // Compute direction angle from last position
      let angle = 0
      if (lastMouse.current) {
        const dx = mx - lastMouse.current.x
        const dy = my - lastMouse.current.y
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          // atan2 gives angle in radians, convert to degrees
          // The boomerang SVG points right (0°), so:
          // right = 0°, down = 90°, left = 180°, up = -90°
          angle = Math.atan2(dy, dx) * (180 / Math.PI)
        }
      }
      lastMouse.current = { x: mx, y: my }

      const pixelElement = document.getElementById(
        `${trailId.current}-pixel-${x}-${y}`
      )
      if (pixelElement) {
        const animatePixel = (pixelElement as any).__animatePixel
        if (animatePixel) animatePixel(angle)
      }
    },
    [pixelSize]
  )

  const columns = useMemo(
    () => Math.ceil(dimensions.width / pixelSize),
    [dimensions.width, pixelSize]
  )
  const rows = useMemo(
    () => Math.ceil(dimensions.height / pixelSize),
    [dimensions.height, pixelSize]
  )

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 w-full h-full pointer-events-auto",
        className
      )}
      onMouseMove={handleMouseMove}
    >
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <PixelDot
              key={`${colIndex}-${rowIndex}`}
              id={`${trailId.current}-pixel-${colIndex}-${rowIndex}`}
              size={pixelSize}
              fadeDuration={fadeDuration}
              delay={delay}
              className={pixelClassName}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

interface PixelDotProps {
  id: string
  size: number
  fadeDuration: number
  delay: number
  className?: string
}

const PixelDot: React.FC<PixelDotProps> = React.memo(
  ({ id, size, fadeDuration, delay, className }) => {
    const controls = useAnimationControls()
    const svgRef = useRef<SVGSVGElement>(null)

    const animatePixel = useCallback(
      (angle: number = 0) => {
        // Rotate the SVG to match mouse direction
        if (svgRef.current) {
          svgRef.current.style.transform = `rotate(${angle}deg)`
        }
        controls.start({
          opacity: [1, 0],
          transition: { duration: fadeDuration / 1000, delay: delay / 1000 },
        })
      },
      [controls, fadeDuration, delay]
    )

    const ref = useCallback(
      (node: HTMLDivElement | null) => {
        if (node) {
          ;(node as any).__animatePixel = animatePixel
        }
      },
      [animatePixel]
    )

    const isBoomerang = className?.includes("pixel-boomerang")

    return (
      <motion.div
        id={id}
        ref={ref}
        className={cn("cursor-pointer-none", isBoomerang ? "" : className)}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
        initial={{ opacity: 0 }}
        animate={controls}
        exit={{ opacity: 0 }}
      >
        {isBoomerang && (
          <svg
            ref={svgRef}
            viewBox="0 0 512 512"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full transition-none"
          >
            <path d="M394.58,212.792L169.463,11.447C152.995-4.1,127.019-3.811,110.902,12.314c-16.125,16.116-16.414,42.092-0.867,58.561l165.658,185.064L110.081,441.113c-15.546,16.468-15.257,42.436,0.867,58.561c16.117,16.125,42.092,16.405,58.561,0.859l223.009-199.635c1.25-1.046,2.468-2.155,3.641-3.327c22.983-22.983,22.983-60.226,0-83.201c-0.532-0.531-1.079-1.039-1.61-1.547L394.58,212.792z" />
          </svg>
        )}
      </motion.div>
    )
  }
)

PixelDot.displayName = "PixelDot"

export { PixelTrail }
