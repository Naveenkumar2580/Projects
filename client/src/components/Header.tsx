import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import LogoText from '@/components/LogoText';
import ThemeToggle from '@/components/ThemeToggle';
import { useAuth } from '@/context/AuthContext';
import { useModal } from '@/context/ModalContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Menu, X, User, LogOut, Settings, 
  ChevronDown, UserPlus 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { openModal } = useModal();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginClick = () => {
    setIsMobileMenuOpen(false);
    openModal('login');
  };
  
  const handleRegisterClick = () => {
    setIsMobileMenuOpen(false);
    openModal('register');
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out"
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user || !user.displayName) return '?';
    
    const names = user.displayName.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled ? 'bg-background/90 backdrop-blur-sm shadow-sm' : 'bg-background/0',
        className
      )}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="font-bold text-2xl md:text-3xl">
            <LogoText />
          </h1>
        </div>
        
        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <a 
            onClick={() => scrollToSection('home')} 
            className="hover:text-primary cursor-pointer transition-colors"
          >
            Home
          </a>
          <a 
            onClick={() => scrollToSection('portfolio')} 
            className="hover:text-primary cursor-pointer transition-colors"
          >
            Portfolio
          </a>
          <a 
            onClick={() => scrollToSection('services')} 
            className="hover:text-primary cursor-pointer transition-colors"
          >
            Services
          </a>
          <a 
            onClick={() => scrollToSection('contact')} 
            className="hover:text-primary cursor-pointer transition-colors"
          >
            Contact
          </a>
          
          <ThemeToggle />
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 flex items-center space-x-2 px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src={user?.photoURL || undefined} 
                      alt={user?.displayName || "User"} 
                    />
                    <AvatarFallback className="text-sm">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block text-sm font-medium">
                    {user?.displayName || user?.email?.split('@')[0] || "Account"}
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.displayName || "My Account"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline"
                onClick={handleRegisterClick}
                className="flex items-center"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </Button>
              <Button 
                onClick={handleLoginClick}
                variant="default"
              >
                Login
              </Button>
            </div>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <ThemeToggle />
          
          {isAuthenticated && (
            <Avatar className="h-8 w-8" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <AvatarImage 
                src={user?.photoURL || undefined} 
                alt={user?.displayName || "User"} 
              />
              <AvatarFallback className="text-sm">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            className={isAuthenticated ? "hidden" : ""}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden bg-background w-full py-4 px-4 shadow-md transition-all duration-300",
        isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
      )}>
        <div className="flex flex-col space-y-4">
          {isAuthenticated && (
            <div className="flex items-center space-x-3 p-2 mb-2 bg-primary/5 rounded-lg">
              <Avatar className="h-10 w-10">
                <AvatarImage 
                  src={user?.photoURL || undefined} 
                  alt={user?.displayName || "User"} 
                />
                <AvatarFallback>
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">
                  {user?.displayName || "Account"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user?.email}
                </span>
              </div>
            </div>
          )}
          
          <a 
            onClick={() => scrollToSection('home')} 
            className="py-2 hover:text-primary cursor-pointer transition-colors"
          >
            Home
          </a>
          <a 
            onClick={() => scrollToSection('portfolio')} 
            className="py-2 hover:text-primary cursor-pointer transition-colors"
          >
            Portfolio
          </a>
          <a 
            onClick={() => scrollToSection('services')} 
            className="py-2 hover:text-primary cursor-pointer transition-colors"
          >
            Services
          </a>
          <a 
            onClick={() => scrollToSection('contact')} 
            className="py-2 hover:text-primary cursor-pointer transition-colors"
          >
            Contact
          </a>
          
          {isAuthenticated ? (
            <>
              <a 
                className="py-2 hover:text-primary cursor-pointer transition-colors flex items-center"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </a>
              <a 
                className="py-2 hover:text-primary cursor-pointer transition-colors flex items-center"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </a>
              <Button 
                onClick={handleLogout}
                variant="destructive"
                className="mt-2 flex items-center justify-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </Button>
            </>
          ) : (
            <div className="flex flex-col space-y-2 pt-2">
              <Button 
                onClick={handleLoginClick}
                variant="default"
              >
                Login
              </Button>
              <Button 
                onClick={handleRegisterClick}
                variant="outline"
                className="flex items-center justify-center"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
