import React from 'react';
import "../styles/globals.css";
import styles from "./Layout.module.scss"

import Menu from '@/app/components/Menu';

export default function Layout({ children }) {

  return (
    <div className={styles.main}>
        <Menu />
        <div className={styles.container}>
            {children}
        </div>
    </div>
  );
}