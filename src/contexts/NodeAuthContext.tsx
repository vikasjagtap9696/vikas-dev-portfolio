import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import api from "@/lib/api";

interface User {
  email: string;
  role: string;
}

interface NodeAuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const NodeAuthContext = createContext<NodeAuthContextType | undefined>(undefined);

export function NodeAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = api.getToken();
      if (token) {
        try {
          const result = await api.verifyToken();
          if (result.valid && result.user) {
            setUser(result.user);
            setIsAdmin(result.user.role === 'admin');
          } else {
            api.setToken(null);
            setUser(null);
            setIsAdmin(false);
          }
        } catch {
          api.setToken(null);
          setUser(null);
          setIsAdmin(false);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const result = await api.login(email, password);
      setUser(result.user);
      setIsAdmin(result.user?.role === 'admin');
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string, _fullName: string) => {
    // Node.js backend doesn't have signup - admin only login
    // You can extend the backend to support user registration
    return { 
      error: new Error("Sign up is not available. Please contact the administrator.") 
    };
  };

  const signInWithGoogle = async () => {
    // Google OAuth not implemented in Node.js backend
    return { 
      error: new Error("Google sign-in is not available with this backend.") 
    };
  };

  const signOut = async () => {
    await api.logout();
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <NodeAuthContext.Provider value={{
      user,
      isAdmin,
      loading,
      signIn,
      signUp,
      signInWithGoogle,
      signOut
    }}>
      {children}
    </NodeAuthContext.Provider>
  );
}

export function useNodeAuth() {
  const context = useContext(NodeAuthContext);
  if (context === undefined) {
    throw new Error("useNodeAuth must be used within a NodeAuthProvider");
  }
  return context;
}
