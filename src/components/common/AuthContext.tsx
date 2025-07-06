import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: number;
  username: string;
  email?: string;
  profile_picture_url?: string;
  is_verified?: boolean;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInError: string | null;
  setSignInError?: (err: string | null) => void;
  signUpError: string | null;
  setSignUpError?: (err: string | null) => void;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (data: FormData) => Promise<void>;
  fetchUser: () => Promise<void>;
  updateProfile: (data: FormData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signInError, setSignInError] = useState<string | null>(null);
  const [signUpError, setSignUpError] = useState<string | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users/me', { credentials: 'include' });
      const data = await res.json();
      if (data.user) setUser({ ...data.user, is_verified: data.user.is_verified });
      else setUser(null);
    } catch (e) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUser(); }, []);

  const login = async (username: string, password: string) => {
    setSignInError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });
      
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Credentials are incorrect!');
        } else {
          throw new Error('Server error. Please try again.');
        }
      }
      
      let data;
      try {
        data = await res.json();
      } catch (parseError) {
        throw new Error('Server is not responding. Please check if the backend is running.');
      }
      
      if (data.user) setUser({ ...data.user, is_verified: data.user.is_verified });
      else throw new Error(data.error || 'Login failed');
    } catch (e: any) {
      setSignInError(e.message);
      setUser(null);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await fetch('/api/users/logout', { method: 'POST', credentials: 'include' });
      setUser(null);
    } catch (e) {
      // Optionally handle logout error
    } finally {
      setLoading(false);
    }
  };

  const signup = async (data: FormData) => {
    setSignUpError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/users/signup', {
        method: 'POST',
        credentials: 'include',
        body: data
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Signup failed. Please try again.');
      }
      
      let result;
      try {
        result = await res.json();
      } catch (parseError) {
        throw new Error('Server is not responding. Please check if the backend is running.');
      }
      
      if (result.user) setUser({ ...result.user, is_verified: result.user.is_verified });
      else throw new Error(result.error || 'Signup failed');
    } catch (e: any) {
      setSignUpError(e.message);
      setUser(null);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/users/me', {
        method: 'PUT',
        credentials: 'include',
        body: data
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Update failed. Please try again.');
      }
      
      let result;
      try {
        result = await res.json();
      } catch (parseError) {
        throw new Error('Server is not responding. Please check if the backend is running.');
      }
      
      if (result.user) setUser({ ...result.user, is_verified: result.user.is_verified });
      else throw new Error(result.error || 'Update failed');
    } catch (e: any) {
      // Optionally handle update error
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInError, setSignInError, signUpError, setSignUpError, login, logout, signup, fetchUser, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}; 