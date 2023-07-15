"use client"
import Image from 'next/image'
import styles from './products.module.css'
import React, {Suspense, useEffect, useState, useCallback} from "react";
import Products from "@/app/products"
import SearchBar from "@/app/search/searchBar";

export function searchProducts(inputText) {
    // Fetch data from API
    return new Promise((resolve) => {
        resolve(fetch('http://localhost:8000/api/v1/products/filtering?inputText=' +inputText)
            .then((response) => response.json()))
    })
}

export default function Home() {
    const [result, setState] = useState(undefined)

    const handleClick = useCallback((inputText) => {
        searchProducts(inputText)
            .then(result => {
                setState(result)
            })
    }, []);

  return (
      <div>
          <SearchBar handleClick={handleClick}></SearchBar>
          <Products productsFiltered={result}/>
      </div>
  )
}
