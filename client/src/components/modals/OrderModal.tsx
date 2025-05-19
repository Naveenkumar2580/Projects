import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useModal } from '@/context/ModalContext';
import ModalWrapper from './ModalWrapper';
import { saveOrder } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const { selectedItem, openModal } = useModal();
  
  const [orderForm, setOrderForm] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    requirements: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  // Reset form when user changes
  useEffect(() => {
    if (user) {
      setOrderForm(prev => ({
        ...prev,
        name: user.displayName || prev.name,
        email: user.email || prev.email
      }));
    }
  }, [user]);
  
  // Update validation state when form changes
  useEffect(() => {
    const { name, email, phone } = orderForm;
    setIsValidated(!!name && !!email && !!phone);
  }, [orderForm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrderForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem || !isValidated) return;
    
    try {
      setIsSubmitting(true);
      
      // Add a small delay for better user experience
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Save order to database
      await saveOrder({
        service: selectedItem.title || '',
        price: selectedItem.price || 0,
        currency: selectedItem.currency || 'USD',
        customerName: orderForm.name,
        customerEmail: orderForm.email,
        customerPhone: orderForm.phone,
        requirements: orderForm.requirements,
        userId: user?.uid
      });
      
      toast({
        title: "Order Submitted",
        description: "Your order information has been saved.",
      });
      
      onClose();
      openModal('payment');
    } catch (error: any) {
      console.error('Error submitting order:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalWrapper 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`Order: ${selectedItem?.title || 'Service'}`}
      description="Please fill out the form below to place your order."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="orderName">Your Name</Label>
          <Input 
            id="orderName"
            name="name"
            value={orderForm.name}
            onChange={handleChange}
            placeholder="Enter your name"
            disabled={isSubmitting}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="orderEmail">Email Address</Label>
          <Input 
            id="orderEmail"
            name="email"
            type="email"
            value={orderForm.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            disabled={isSubmitting}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="orderPhone">Phone Number</Label>
          <Input 
            id="orderPhone"
            name="phone"
            type="tel"
            value={orderForm.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            disabled={isSubmitting}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="orderRequirements">Project Requirements</Label>
          <Textarea 
            id="orderRequirements"
            name="requirements"
            value={orderForm.requirements}
            onChange={handleChange}
            rows={3}
            placeholder="Tell us about your specific requirements"
            disabled={isSubmitting}
          />
        </div>
        
        <div className="pt-4 border-t border-border">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Service:</span>
            <span className="font-medium">{selectedItem?.title}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="font-medium">Price:</span>
            <span className="font-medium">{selectedItem?.formattedPrice}</span>
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting || !isValidated}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </span>
            ) : (
              'Proceed to Payment'
            )}
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
