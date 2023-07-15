"use client"
import React, {useEffect, useState} from "react";
import styles from '@/app/search/searchBar.module.css'

export default function MainHeader() {
    return (
        <div id="search-bar" className={styles.searchBar}>
            <h2>
                Smartex Product Catalog
            </h2>
        </div>
    );
};