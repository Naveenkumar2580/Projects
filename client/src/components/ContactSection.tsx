import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { socialLinks } from '@/lib/utils';
import { saveContactMessage, saveFeedback } from '@/lib/firebase';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactSection() {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFeedbackSubmitting, setIsFeedbackSubmitting] = useState(false);

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await saveContactMessage(contactForm);
      
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. We'll get back to you soon.",
      });
      
      // Reset form
      setContactForm({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!feedback.trim() || isFeedbackSubmitting) return;

    try {
      setIsFeedbackSubmitting(true);
      await saveFeedback(feedback);
      
      toast({
        title: "Feedback Received!",
        description: "Thank you for your feedback. We appreciate your input!",
      });
      
      // Reset form
      setFeedback('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Error",
        description: "Failed to send feedback. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsFeedbackSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
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
            Get In Touch
          </motion.h2>
          <motion.p 
            className="max-w-2xl mx-auto text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Have a project in mind? We'd love to help you bring your vision to life.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6">Send us a message</h3>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium">Your Name</label>
                    <Input 
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium">Email Address</label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block mb-2 font-medium">Subject</label>
                    <Input 
                      id="subject"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleContactChange}
                      placeholder="What is this regarding?"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                    <Textarea 
                      id="message"
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      rows={4}
                      placeholder="Tell us about your project or inquiry"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Contact Information & Social Media */}
          <motion.div 
            className="flex flex-col justify-between"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="mb-8">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full mr-4 mt-1">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <a 
                        href="mailto:in5niteyields@gmail.com" 
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        in5niteyields@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full mr-4 mt-1">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Phone</h4>
                      <a 
                        href="tel:+916383412733" 
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        +91 6383412733
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full mr-4 mt-1">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Location</h4>
                      <p className="text-muted-foreground">Chennai, Tamil Nadu, India</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Social Media */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6">Connect With Us</h3>
                <div className="flex flex-wrap gap-4 mb-8">
                  {socialLinks.map((link, index) => (
                    <a 
                      key={`social-${index}`}
                      href={link.url} 
                      className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-primary hover:text-white transition-all"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${link.icon.replace('bxl-', '')}`}
                    >
                      <i className={`bx ${link.icon} text-2xl`}></i>
                    </a>
                  ))}
                </div>
                
                {/* Feedback Section */}
                <div>
                  <h4 className="font-medium mb-3">Share Your Feedback</h4>
                  <div className="flex">
                    <Input 
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="rounded-r-none"
                      placeholder="Your feedback helps us improve"
                    />
                    <Button 
                      onClick={handleFeedbackSubmit}
                      className="rounded-l-none"
                      disabled={!feedback.trim() || isFeedbackSubmitting}
                    >
                      {isFeedbackSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
