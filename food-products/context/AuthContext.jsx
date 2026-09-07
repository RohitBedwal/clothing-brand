import React, { createContext, useState, useEffect, useCallback } from 'react'
import authService from '../services/authService'

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await authService.getMe();
        if (data.success && data.user) {
          setCurrentUser(data.user);
        }
      } catch {
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await authService.login(email, password);
    if (data.success) {
      setCurrentUser(data.user);
      return data.user;
    }
    throw new Error(data.message || 'Login failed');
  }, []);

  const register = useCallback(async (data) => {
    const res = await authService.register(data);
    if (res.success) {
      setCurrentUser(res.user);
      return res.user;
    }
    throw new Error(res.message || 'Registration failed');
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setCurrentUser(null);
    }
  }, []);

  const updateProfile = useCallback(async (data) => {
    const res = await authService.updateProfile(data);
    if (res.success) {
      setCurrentUser(res.user);
      return res.user;
    }
    throw new Error(res.message || 'Update failed');
  }, []);

  const forgotPassword = useCallback(async (email) => {
    const res = await authService.forgotPassword(email);
    return res;
  }, []);

  const resetPassword = useCallback(async (token, password) => {
    const res = await authService.resetPassword(token, password);
    return res;
  }, []);

  const isAuthenticated = !!currentUser;

  return (
    <authContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        updateProfile,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
