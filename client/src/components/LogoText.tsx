import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LogoTextProps {
  className?: string;
}

export default function LogoText({ className }: LogoTextProps) {
  // The 5 colors used in the IN5NITE logo
  const colors = [
    '#ff6b6b', // red
    '#4ecdc4', // teal
    '#ffbe0b', // yellow
    '#7209b7', // purple
    '#3a86ff', // blue
  ];

  // Character styles for the logo text
  const charVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <span className={cn('flex items-center', className)}>
      <span className="font-bold flex">
        {/* Animate each letter of IN5NITE */}
        {'IN5NITE'.split('').map((char, i) => (
          <motion.span
            key={`logo-char-${i}`}
            className={i === 2 ? 'text-primary font-extrabold' : ''} // Make the 5 stand out
            initial="initial"
            animate="animate"
            transition={{ 
              duration: 0.5, 
              delay: i * 0.08,
              ease: "easeOut"
            }}
            variants={charVariants}
            style={{
              display: 'inline-block',
              color: i < 5 ? colors[i] : ''
            }}
          >
            {char}
          </motion.span>
        ))}
      </span>
      <motion.span 
        className="ml-1 dark:text-white text-black transition-colors"
        initial="initial"
        animate="animate"
        transition={{ 
          duration: 0.5, 
          delay: 0.7,
          ease: "easeOut"
        }}
        variants={charVariants}
      >
        YIELDS
      </motion.span>
    </span>
  );
}
