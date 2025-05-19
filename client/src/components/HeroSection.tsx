import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import LogoText from '@/components/LogoText';
import { ChevronDown } from 'lucide-react';
// Import the SVG asset
import heroImagePath from '@/assets/hero-image.svg'; // Using the alias '@' for 'src'

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 1.2, 
        ease: "easeOut",
        delay: 0.5 
      }
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen pt-24 flex items-center justify-center overflow-hidden relative"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary/10 blur-xl"
          animate={{ 
            x: [0, 20, 0], 
            y: [0, 10, 0] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-purple-500/10 blur-xl"
          animate={{ 
            x: [0, -20, 0], 
            y: [0, -15, 0] 
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 py-8 lg:py-16 flex flex-col items-center">
        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div 
            className="text-center lg:text-left order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 
              className="text-xl md:text-2xl mb-4"
              variants={itemVariants}
            >
              Welcome to
            </motion.h2>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              variants={itemVariants}
            >
              <LogoText className="justify-center lg:justify-start" />
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-8 opacity-80"
              variants={itemVariants}
            >
              Transforming ideas into exceptional digital experiences. We create stunning portfolios and websites that drive results.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <Button 
                  size="lg" 
                  onClick={() => scrollToSection('portfolio')}
                  className="group"
                >
                  View Portfolio
                </Button>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection('contact')}
                  className="group"
                >
                  Contact Us
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Hero image */}
          <motion.div 
            className="order-1 lg:order-2 flex justify-center"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.img 
              src={heroImagePath} 
              alt="Digital experiences illustration" 
              className="max-w-full w-full max-h-[400px] object-contain"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            />
          </motion.div>
        </div>
        
        {/* Scrolling indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1, 
            delay: 1.5,
            ease: "easeOut"
          }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Scroll to explore</span>
            <ChevronDown className="h-6 w-6 animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
