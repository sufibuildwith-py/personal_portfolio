import React, { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

interface WordProps {
  word: string
  progress: MotionValue<number>
  range: [number, number]
}

const Word: React.FC<WordProps> = ({ word, progress, range }) => {
  // Smoothly transform from muted charcoal (0.28) to deep pitch-black (1) on light background
  const opacity = useTransform(progress, range, [0.28, 1])

  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-nowrap select-text">
      {word}
    </motion.span>
  )
}

interface AnimatedTextProps {
  text: string
  className?: string
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'start 0.35'],
  })

  const words = text.split(' ')
  const totalWords = words.length

  return (
    <p
      ref={containerRef}
      className={`text-[#11100F] font-semibold text-center leading-relaxed max-w-[720px] mx-auto flex flex-wrap justify-center gap-x-[0.3em] ${className}`}
      style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.55rem)' }}
    >
      {words.map((word, wordIdx) => {
        const start = wordIdx / totalWords
        const end = (wordIdx + 1) / totalWords
        return (
          <Word
            key={wordIdx}
            word={word}
            progress={scrollYProgress}
            range={[start, end]}
          />
        )
      })}
    </p>
  )
}

export default AnimatedText
