import { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  ReactNode 
} from 'react';
import { 
  auth, 
  onAuthStateChanged, 
  loginWithEmail, 
  registerWithEmail, 
  logout as firebaseLogout,
  resetPassword as firebaseResetPassword,
  updateUserProfile as firebaseUpdateProfile,
  User 
} from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (displayName: string, photoURL?: string) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await loginWithEmail(email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, displayName?: string) => {
    try {
      const userCredential = await registerWithEmail(email, password);
      
      // Update display name if provided
      if (displayName && userCredential.user) {
        await firebaseUpdateProfile(displayName);
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await firebaseLogout();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };
  
  const resetPassword = async (email: string) => {
    try {
      await firebaseResetPassword(email);
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  };
  
  const updateProfile = async (displayName: string, photoURL?: string) => {
    try {
      await firebaseUpdateProfile(displayName, photoURL);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout,
      resetPassword,
      updateProfile,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
