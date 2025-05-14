
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { User, UserPreferences } from "@/types";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: 'doctor' | 'admin') => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  updatePreferences: (preferences: UserPreferences) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo
const MOCK_USER: User = {
  id: "user-1",
  name: "Dr. Aditya Sharma",
  email: "dr.aditya@mediscribe.com",
  role: "doctor",
  specialty: "both",
  clinic: "GI & Obesity Clinic",
  preferences: {
    language: "english",
    noteTemplate: "SOAP",
    darkMode: false,
  },
  createdAt: new Date("2023-01-15"),
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // This is a mock login - in a real app, make an API call
      if (email && password) {
        // For demo purposes, use the mock user
        setUser(MOCK_USER);
        localStorage.setItem("user", JSON.stringify(MOCK_USER));
        
        // Show success toast
        toast.success("Login successful!");
        
        // Check if user has completed onboarding
        if (!MOCK_USER.preferences?.noteTemplate) {
          navigate("/onboarding");
        } else {
          navigate("/dashboard");
        }
      } else {
        throw new Error("Email and password are required");
      }
    } catch (err) {
      setError((err as Error).message);
      toast.error("Login failed: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, role: 'doctor' | 'admin') => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock signup
      if (name && email && password) {
        const newUser: User = {
          id: "user-" + Date.now(),
          name,
          email,
          role,
          createdAt: new Date(),
        };
        
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        
        toast.success("Account created successfully!");
        navigate("/onboarding");
      } else {
        throw new Error("All fields are required");
      }
    } catch (err) {
      setError((err as Error).message);
      toast.error("Signup failed: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.info("You have been logged out");
    navigate("/login");
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const updatePreferences = (preferences: UserPreferences) => {
    if (user) {
      const updatedUser = { ...user, preferences };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        signup,
        logout,
        updateUser,
        updatePreferences,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
