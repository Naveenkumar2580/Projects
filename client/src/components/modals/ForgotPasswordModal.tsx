import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useModal } from '@/context/ModalContext';
import { useToast } from '@/hooks/use-toast';
import ModalWrapper from './ModalWrapper';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { resetPassword } = useAuth();
  const { openModal } = useModal();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      await resetPassword(email);
      
      setEmailSent(true);
      toast({
        title: "Reset Link Sent",
        description: "Check your email for password reset instructions"
      });
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast({
        title: "Request Failed",
        description: error.message || "Could not send reset instructions",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Reset Your Password">
      {!emailSent ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
        
          <div>
            <Label htmlFor="resetEmail">Email Address</Label>
            <Input 
              id="resetEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Instructions'}
          </Button>
          
          <p className="text-center text-sm">
            <Button 
              variant="link" 
              className="p-0 h-auto"
              onClick={(e) => {
                e.preventDefault();
                openModal('login');
              }}
            >
              Back to login
            </Button>
          </p>
        </form>
      ) : (
        <div className="text-center space-y-4">
          <div className="mx-auto my-6 p-4 rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary w-8 h-8">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </div>
          
          <h3 className="font-medium text-lg">Check Your Email</h3>
          <p className="text-sm text-muted-foreground">
            We've sent reset instructions to<br />
            <span className="font-medium text-foreground">{email}</span>
          </p>
          
          <div className="pt-4">
            <Button
              className="w-full"
              onClick={onClose}
            >
              Close
            </Button>
            
            <p className="mt-4 text-sm text-muted-foreground">
              Didn't receive the email?{' '}
              <Button
                variant="link"
                className="p-0 h-auto"
                onClick={(e) => {
                  e.preventDefault();
                  setEmailSent(false);
                }}
              >
                Try again
              </Button>
            </p>
          </div>
        </div>
      )}
    </ModalWrapper>
  );
}