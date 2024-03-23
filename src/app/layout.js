"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from './lib/supabase';

import "./styles/globals.css";
import styles from "./layout.module.scss"

import Metadata from "@/app/components/Metadata";
import Menu from '@/app/components/Menu';

import { useAuth, AuthProvider } from '@/contexts/AuthContext';
import PasswordForm from '@/app/components/PasswordForm';

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
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Lexend:wght@100..900&display=swap" rel="stylesheet" />
        </head>
        <body className={styles.main}>
            {authCheckPerformed && authenticated ? (
            <>
            <Menu />
            <div className={styles.container}>
             {children}
            </div>
            </>
          ) : null}
          {authCheckPerformed && !authenticated && <PasswordForm />}
        </body>
      </html>
    </AuthProvider>
  );
}