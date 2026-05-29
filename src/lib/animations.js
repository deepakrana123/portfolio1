// Shared animation variants for Framer Motion

export const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.23, 1, 0.32, 1],
    },
  }),
}

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.7, delay, ease: 'easeOut' },
  }),
}

export const slideLeft = {
  hidden:  { opacity: 0, x: -60 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, delay, ease: [0.23, 1, 0.32, 1] },
  }),
}

export const slideRight = {
  hidden:  { opacity: 0, x: 60 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, delay, ease: [0.23, 1, 0.32, 1] },
  }),
}

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] },
  }),
}

export const staggerContainer = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

export const staggerItem = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] },
  },
}

// Spring config for interactive elements
export const springConfig = {
  type: 'spring',
  stiffness: 300,
  damping: 24,
}

export const softSpring = {
  type: 'spring',
  stiffness: 180,
  damping: 20,
}
