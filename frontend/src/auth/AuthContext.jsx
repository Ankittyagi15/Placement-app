import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

const API_BASE = import.meta.env.VITE_API_BASE || 'https://placement-app-real.onrender.com/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('pp_user');
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('pp_token'));

  useEffect(() => {
    if (user) localStorage.setItem('pp_user', JSON.stringify(user));
    else localStorage.removeItem('pp_user');
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem('pp_token', token);
    else localStorage.removeItem('pp_token');
  }, [token]);

  async function login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    setUser(data.user); setToken(data.token);
  }

  async function signup(name, email, password) {
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Signup failed');
    setUser(data.user); setToken(data.token);
  }

  function logout() {
    setUser(null); setToken(null);
  }

  function authHeaders() {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, authHeaders, API_BASE }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }


