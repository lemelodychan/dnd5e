import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import styles from './PasswordForm.module.scss'

import { IoArrowForwardOutline } from "react-icons/io5";

export async function generateMetadata() {
  return {
    title: "UOC TTRPG | Character Sheet Manager",
    description: "In progress",
  };
}

const PasswordForm = () => {
  const { login } = useAuth();
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with password:', password);
    login(password);
  };

  return (
    <>
        <form onSubmit={handleSubmit} className={styles.form}>
            <h1>Oops!</h1>
            <p>The access to this portfolio is currently restricted.</p>
            <label>
                <span>Enter password:</span>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <button type="submit"><span>Let me in!</span><IoArrowForwardOutline /></button>
        </form>
    </>
  );
};

export default PasswordForm;