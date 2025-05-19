import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/context/AuthContext';
import { useModal } from '@/context/ModalContext';
import { useToast } from '@/hooks/use-toast';
import ModalWrapper from './ModalWrapper';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { openModal } = useModal();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      await login(email, password);
      
      toast({
        title: "Login Successful",
        description: "Welcome back to IN5NITE YIELDS!"
      });
      
      onClose();
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error.message || "Could not log in with those credentials",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Welcome Back">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="loginEmail">Email Address</Label>
          <Input 
            id="loginEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="loginPassword">Password</Label>
          <Input 
            id="loginPassword"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="rememberMe" 
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(!!checked)}
            />
            <Label htmlFor="rememberMe" className="text-sm cursor-pointer">
              Remember me
            </Label>
          </div>
          <Button 
            variant="link" 
            className="p-0 h-auto text-sm"
            onClick={(e) => {
              e.preventDefault();
              openModal('forgotPassword');
            }}
          >
            Forgot password?
          </Button>
        </div>
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
        
        <p className="text-center text-sm">
          Don't have an account?{' '}
          <Button 
            variant="link" 
            className="p-0 h-auto"
            onClick={(e) => {
              e.preventDefault();
              openModal('register');
            }}
          >
            Sign up
          </Button>
        </p>
      </form>
    </ModalWrapper>
  );
}
