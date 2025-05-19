import { motion } from 'framer-motion';
import { portfolioItems } from '@/lib/utils';
import PortfolioCard from './PortfolioCard';

export default function PortfolioSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  // Split the portfolio items into two grids
  const firstGridItems = portfolioItems.slice(0, 6);
  const secondGridItems = portfolioItems.slice(6);

  return (
    <section 
      id="portfolio" 
      className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Portfolio
          </motion.h2>
          <motion.p 
            className="max-w-2xl mx-auto text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Discover our latest projects and see how we've helped businesses transform their digital presence.
          </motion.p>
        </div>
        
        {/* First Grid - Business Websites */}
        <motion.div className="mb-16">
          <motion.h3
            className="text-2xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Business & E-commerce Solutions
          </motion.h3>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {firstGridItems.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <PortfolioCard 
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  priceUSD={item.priceUSD}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Second Grid - Specialized Platforms */}
        <motion.div>
          <motion.h3
            className="text-2xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Specialized & Industry-Specific Platforms
          </motion.h3>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {secondGridItems.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <PortfolioCard 
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  priceUSD={item.priceUSD}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
