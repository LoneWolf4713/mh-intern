'use client';
import {
  motion,
  VariantLabels,
  Target,
  TargetAndTransition,
  Transition,
} from 'framer-motion';
import { useState, useEffect } from 'react';

export type TextRollProps = {
  children: string;
  duration?: number;
  getEnterDelay?: (index: number) => number;
  getExitDelay?: (index: number) => number;
  className?: string;
  transition?: Transition;
  variants?: {
    enter: {
      initial: Target | VariantLabels | boolean;
      animate: TargetAndTransition | VariantLabels;
    };
    exit: {
      initial: Target | VariantLabels | boolean;
      animate: TargetAndTransition | VariantLabels;
    };
  };
  onAnimationComplete?: () => void;
  initialDelay?: number; // Added: Wait before the very first roll starts
  loopDelay?: number;    // Added: Gap between infinite loops
};

export function TextRoll({
  children,
  duration = 0.5,
  getEnterDelay = (i) => i * 0.1,
  getExitDelay = (i) => i * 0.1 + 0.2,
  className,
  transition = { ease: 'easeIn' },
  variants,
  onAnimationComplete,
  initialDelay = 500, // Default 500ms before starting
  loopDelay = 2000,   // Default 2 seconds gap between loops
}: TextRollProps) {
  const [animationKey, setAnimationKey] = useState(0);
  const [isAnimating, setIsAnimating] = useState(initialDelay === 0);
  const [isCycleComplete, setIsCycleComplete] = useState(false);

  // Manage initial load delay and subsequent loop gaps safely
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (!isAnimating && animationKey === 0 && initialDelay > 0) {
      timer = setTimeout(() => {
        setIsAnimating(true);
      }, initialDelay);
    } else if (isCycleComplete) {
      timer = setTimeout(() => {
        setIsCycleComplete(false);
        setAnimationKey((prev) => prev + 1); // Triggers a remount for Framer Motion to restart
      }, loopDelay);
    }

    return () => clearTimeout(timer);
  }, [initialDelay, loopDelay, isAnimating, isCycleComplete, animationKey]);

  const defaultVariants = {
    enter: {
      initial: { rotateX: 0 },
      animate: { rotateX: 90 },
    },
    exit: {
      initial: { rotateX: 90 },
      animate: { rotateX: 0 },
    },
  } as const;

  const letters = children.split('');

  const handleSequenceComplete = () => {
    setIsCycleComplete(true);
    if (onAnimationComplete) {
      onAnimationComplete();
    }
  };

  return (
    <span className={className} key={animationKey}>
      {letters.map((letter, i) => {
        const isLast = letters.length === i + 1;

        return (
          <span
            key={i}
            className='relative inline-block [perspective:10000px] [transform-style:preserve-3d] [width:auto]'
            aria-hidden='true'
          >
            <motion.span
              className='absolute inline-block [backface-visibility:hidden] [transform-origin:50%_25%]'
              initial={
                variants?.enter?.initial ?? defaultVariants.enter.initial
              }
              animate={
                isAnimating
                  ? variants?.enter?.animate ?? defaultVariants.enter.animate
                  : variants?.enter?.initial ?? defaultVariants.enter.initial
              }
              transition={{
                ...transition,
                duration,
                delay: getEnterDelay(i),
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
            <motion.span
              className='absolute inline-block [backface-visibility:hidden] [transform-origin:50%_100%]'
              initial={variants?.exit?.initial ?? defaultVariants.exit.initial}
              animate={
                isAnimating
                  ? variants?.exit?.animate ?? defaultVariants.exit.animate
                  : variants?.exit?.initial ?? defaultVariants.exit.initial
              }
              transition={{
                ...transition,
                duration,
                delay: getExitDelay(i),
              }}
              onAnimationComplete={
                isLast && isAnimating ? handleSequenceComplete : undefined
              }
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
            <span className='invisible'>
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          </span>
        );
      })}
      <span className='sr-only'>{children}</span>
    </span>
  );
}