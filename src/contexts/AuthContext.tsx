import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithPhone: (phone: string, otp: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for development - Replace with Firebase Auth
// New users start with 0 balance
const mockUser: User = {
  id: 'mock-user-123',
  email: 'player@example.com',
  phone: '+919876543210',
  displayName: 'ProPlayer',
  walletBalance: 0,
  winningCredits: 0,
  isBanned: false,
  isAdmin: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockAdmin: User = {
  id: 'mock-admin-456',
  email: 'admin@battlearena.com',
  phone: '+919876543211',
  displayName: 'Admin',
  walletBalance: 0,
  winningCredits: 0,
  isBanned: false,
  isAdmin: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with Firebase Auth
      // import { signInWithEmailAndPassword } from 'firebase/auth';
      // const credential = await signInWithEmailAndPassword(auth, email, password);
      // const userData = await getUserFromFirestore(credential.user.uid);
      
      // Mock implementation for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email.includes('admin')) {
        setUser(mockAdmin);
      } else {
        setUser(mockUser);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginWithPhone = useCallback(async (phone: string, otp: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with Firebase Phone Auth
      // import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
      // const confirmationResult = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
      // const credential = await confirmationResult.confirm(otp);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(mockUser);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with Firebase Auth signOut
      // import { signOut } from 'firebase/auth';
      // await signOut(auth);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin ?? false,
        login,
        loginWithPhone,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
