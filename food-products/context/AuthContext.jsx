import React, { createContext, useState, useEffect, useCallback } from 'react'

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('echo_user'));
    if (savedUser) {
      setCurrentUser(savedUser);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('echo_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('echo_user');
    }
  }, [currentUser]);

  const login = useCallback((email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password) {
          reject(new Error('Email and password are required'));
          return;
        }
        const users = JSON.parse(localStorage.getItem('echo_users') || '[]');
        const user = users.find(u => u.email === email);
        if (!user) {
          reject(new Error('No account found with this email'));
          return;
        }
        if (user.password !== password) {
          reject(new Error('Incorrect password'));
          return;
        }
        const { password: _, ...userWithoutPassword } = user;
        setCurrentUser(userWithoutPassword);
        resolve(userWithoutPassword);
      }, 500);
    });
  }, []);

  const register = useCallback((data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('echo_users') || '[]');
        if (users.find(u => u.email === data.email)) {
          reject(new Error('An account with this email already exists'));
          return;
        }
        const newUser = {
          _id: 'usr_' + Date.now(),
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          password: data.password,
          createdAt: new Date().toISOString(),
        };
        users.push(newUser);
        localStorage.setItem('echo_users', JSON.stringify(users));
        const { password: _, ...userWithoutPassword } = newUser;
        setCurrentUser(userWithoutPassword);
        resolve(userWithoutPassword);
      }, 500);
    });
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('echo_user');
  }, []);

  const updateProfile = useCallback((data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('echo_users') || '[]');
        const idx = users.findIndex(u => u._id === currentUser._id);
        if (idx === -1) {
          reject(new Error('User not found'));
          return;
        }
        users[idx] = { ...users[idx], ...data };
        localStorage.setItem('echo_users', JSON.stringify(users));
        const { password: _, ...userWithoutPassword } = users[idx];
        setCurrentUser(userWithoutPassword);
        resolve(userWithoutPassword);
      }, 300);
    });
  }, [currentUser]);

  const forgotPassword = useCallback((email) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email) {
          reject(new Error('Email is required'));
          return;
        }
        resolve({ message: 'Password reset instructions sent to your email' });
      }, 500);
    });
  }, []);

  const resetPassword = useCallback((token, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!token || !password) {
          reject(new Error('Token and password are required'));
          return;
        }
        resolve({ message: 'Password has been reset successfully' });
      }, 500);
    });
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
