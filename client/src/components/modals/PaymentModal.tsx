import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useModal } from '@/context/ModalContext';
import { useToast } from '@/hooks/use-toast';
import ModalWrapper from './ModalWrapper';
import { delay } from '@/lib/utils';
import { Loader2, CreditCard, Smartphone, CheckCircle } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const { selectedItem, openModal } = useModal();
  const { toast } = useToast();
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');

  const handlePayment = async () => {
    if (paymentMethod === 'upi' && !upiId.trim()) {
      toast({
        title: "UPI ID Required",
        description: "Please enter your UPI ID to proceed with the payment",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsProcessing(true);
      
      // Mock payment processing with delay for better UX
      await delay(1500);
      
      toast({
        title: "Payment Successful",
        description: "Your payment has been processed successfully."
      });
      
      onClose();
      openModal('success', {
        title: "Order Confirmed!",
        message: "Thank you for your order. We'll contact you shortly to discuss the next steps."
      });
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ModalWrapper 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Complete Payment"
      description="Choose your preferred payment method to complete your order."
    >
      <div className="space-y-6 py-2">
        <div className="bg-muted/30 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Order Summary</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Service:</span>
            <span className="font-medium">{selectedItem?.title}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-2 mt-2">
            <span className="font-medium">Total:</span>
            <span className="font-bold text-primary">{selectedItem?.formattedPrice}</span>
          </div>
        </div>
        
        <div className="flex gap-2 mb-4">
          <Button
            type="button"
            variant={paymentMethod === 'card' ? 'default' : 'outline'}
            className="flex-1 flex items-center justify-center gap-2"
            onClick={() => setPaymentMethod('card')}
          >
            <CreditCard className="h-4 w-4" />
            Card
          </Button>
          <Button
            type="button"
            variant={paymentMethod === 'upi' ? 'default' : 'outline'}
            className="flex-1 flex items-center justify-center gap-2"
            onClick={() => setPaymentMethod('upi')}
          >
            <Smartphone className="h-4 w-4" />
            UPI
          </Button>
        </div>
        
        {paymentMethod === 'card' ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Card Number</label>
              <Input 
                type="text"
                placeholder="1234 5678 9012 3456"
                disabled={isProcessing}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Expiry Date</label>
                <Input 
                  type="text"
                  placeholder="MM/YY"
                  disabled={isProcessing}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">CVV</label>
                <Input 
                  type="text"
                  placeholder="123"
                  disabled={isProcessing}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Name on Card</label>
              <Input 
                type="text"
                placeholder="John Doe"
                disabled={isProcessing}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <h4 className="font-medium mb-3">Pay with UPI</h4>
              <div className="flex items-center justify-center mb-2">
                <div className="w-32 h-32 bg-white p-2 rounded shadow-sm">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                    <div className="grid grid-cols-3 grid-rows-3 gap-1 w-full h-full p-1">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="bg-gray-800 rounded-sm opacity-70"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Scan the QR code with your UPI app
              </p>
            </div>
            
            <p className="text-center text-sm text-muted-foreground">
              Or pay with GPay/PhonePe by entering your UPI ID
            </p>
            
            <div className="flex">
              <Input 
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="rounded-r-none"
                placeholder="yourname@upi"
                disabled={isProcessing}
              />
              <Button 
                onClick={handlePayment}
                className="rounded-l-none"
                disabled={isProcessing}
              >
                Verify
              </Button>
            </div>
          </div>
        )}
        
        <Button 
          onClick={handlePayment}
          className="w-full"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </span>
          ) : (
            <span className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4" />
              Pay {selectedItem?.formattedPrice}
            </span>
          )}
        </Button>
        
        <p className="text-xs text-center text-muted-foreground">
          Your payment information is encrypted and secure. We do not store your payment details.
        </p>
      </div>
    </ModalWrapper>
  );
}
