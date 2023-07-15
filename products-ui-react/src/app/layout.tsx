"use client"
import './globals.css'
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "@/app/page";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className="styles.bodyClass">
      <Home />
    </body>
    </html>
  )
}
