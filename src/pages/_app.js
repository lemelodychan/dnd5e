import Layout from '@/app/components/Layout'

import React, { useEffect, useState } from 'react';

import "../app/styles/globals.css";
import styles from "./app.module.scss"

import { useAuth, AuthProvider } from '@/contexts/AuthContext';
import PasswordForm from '@/app/components/PasswordForm';
 
export default function MyApp({ Component, pageProps }) {

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
        {authCheckPerformed && authenticated ? (
        <Layout>
            <Component {...pageProps} />
        </Layout>
            ) : null}
            {authCheckPerformed && !authenticated && <PasswordForm />}
    </AuthProvider>
  )
}