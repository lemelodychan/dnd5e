"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from './lib/supabase';

import { Inter } from "next/font/google";
import "./styles/globals.css";

import Metadata from "@/app/components/Metadata";
import Menu from '@/app/components/Menu';

import { useAuth, AuthProvider } from '@/contexts/AuthContext';
import PasswordForm from '@/app/components/PasswordForm';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {

  const [authenticated, setAuthenticated] = useState(false);
  const [authCheckPerformed, setAuthCheckPerformed] = useState(false);

  const handlePasswordSubmit = (password) => {
    if (password === 'catharsis') {
      setAuthenticated(true);
      localStorage.setItem('authenticated', 'true');
    } else {
      alert('Incorrect password');
    }
  };

  useEffect(() => {
    const storedAuthStatus = localStorage.getItem('authenticated');
    const storedAuthExpiration = localStorage.getItem('authExpiration');

    const isExpired = storedAuthExpiration && new Date() > new Date(storedAuthExpiration);

    if (storedAuthStatus === 'true' && !isExpired) {
      setAuthenticated(true);
    }

    setAuthCheckPerformed(true);
  }, []);

  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
            {authCheckPerformed && authenticated ? (
            <>
            <Menu />
            {children}
            </>
          ) : null}
          {authCheckPerformed && !authenticated && <PasswordForm />}
        </body>
      </html>
    </AuthProvider>
  );
}