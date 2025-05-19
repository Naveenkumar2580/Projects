import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Edit, Code } from 'lucide-react';
import { contentCreationServices, websiteDevelopmentServices } from '@/lib/utils';

export default function ServicesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Services
          </motion.h2>
          <motion.p 
            className="max-w-2xl mx-auto text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Comprehensive solutions to help your business stand out in the digital landscape.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Content Creation Services */}
          <motion.div variants={itemVariants}>
            <Card className="h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full mb-6 mx-auto">
                  <Edit className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-semibold text-center mb-4">Content Creation</h3>
                <ul className="space-y-4">
                  {contentCreationServices.map((service, index) => (
                    <li key={`content-${index}`} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium mb-1">{service.title}</h4>
                        <p className="text-muted-foreground">{service.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Website Development Services */}
          <motion.div variants={itemVariants}>
            <Card className="h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-6 mx-auto">
                  <Code className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-2xl font-semibold text-center mb-4">Website Development</h3>
                <ul className="space-y-4">
                  {websiteDevelopmentServices.map((service, index) => (
                    <li key={`web-${index}`} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium mb-1">{service.title}</h4>
                        <p className="text-muted-foreground">{service.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Button 
            size="lg"
            onClick={() => scrollToSection('contact')}
          >
            Get a Free Consultation
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
