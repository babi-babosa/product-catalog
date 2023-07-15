"use client"
import Image from 'next/image'
import styles from './products.module.css'
import React, {Suspense, useEffect, useState, useCallback} from "react";
import Products from "@/app/products"
import SearchBar from "@/app/search/searchBar";

export function searchProducts(inputText: string) {
    // Fetch data from API
    return new Promise((resolve) => {
        resolve(fetch('http://localhost:8000/api/v1/products/filtering?inputText=' +inputText)
            .then((response) => response.json()))
    })
}

export default function Home() {
    const [result, setResult] = useState([])

    const handleClick = useCallback((inputText : string) => {
        searchProducts(inputText)
            .then((products) => {
                setResult(products as any)
            });
    }, []);

  return (
      <div>
          <SearchBar handleClick={handleClick}></SearchBar>
          <Products productsFiltered={result}/>
      </div>
  )
}
