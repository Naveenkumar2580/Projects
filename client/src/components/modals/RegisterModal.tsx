import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useModal } from '@/context/ModalContext';
import { useToast } from '@/hooks/use-toast';
import ModalWrapper from './ModalWrapper';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { openModal } = useModal();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      await register(email, password, name);
      
      toast({
        title: "Registration Successful",
        description: "Welcome to IN5NITE YIELDS!"
      });
      
      onClose();
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: error.message || "Could not create your account",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Create an Account">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="registerName">Full Name</Label>
          <Input 
            id="registerName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="registerEmail">Email Address</Label>
          <Input 
            id="registerEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="registerPassword">Password</Label>
          <Input 
            id="registerPassword"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password (min. 6 characters)"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input 
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
        
        <p className="text-center text-sm">
          Already have an account?{' '}
          <Button 
            variant="link" 
            className="p-0 h-auto"
            onClick={(e) => {
              e.preventDefault();
              openModal('login');
            }}
          >
            Sign in
          </Button>
        </p>
      </form>
    </ModalWrapper>
  );
}