"use client"
import React, { useEffect, useState } from 'react';

import { Inter } from "next/font/google";
import "./styles/globals.css";

import Metadata from "@/app/components/Metadata"
import Menu from '@/app/components/Menu';

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Menu />
        {children}
      </body>
    </html>
  );
}
