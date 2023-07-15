"use client"
import './globals.css'
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "@/app/page";
import ProductInfo from "@/app/product/productInfo";
import ProductCreate from "@/app/product/productAdd";
import CategoryDetail from "@/app/category/categoryDetail";
import CategoryUpdate from "@/app/category/categoryUpdate";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className="styles.bodyClass">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-product" element={<ProductCreate />} />
          <Route path="/product/:productId" element={<ProductInfo />} />
          <Route path="/category/:categoryId" element={<CategoryDetail />} />
          <Route path="/category-edit/:categoryId" element={<CategoryUpdate />} />
        </Routes>
      </BrowserRouter>
    </body>
    </html>
  )
}
