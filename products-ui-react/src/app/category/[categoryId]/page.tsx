'use client'
import {Suspense, useEffect, useState} from "react";
import {ButtonGroup, InputLabel, Select, FormControl, MenuItem, TextField, Divider} from "@mui/material";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import {useParams} from "react-router";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MainHeader from "@/app/mainHeader";
import styles from "../../category.module.css";
import Link from 'next/link';

export function getCategoryById(categoryId) {
    // Fetch data from API
    return new Promise((resolve) => {
        resolve(fetch('http://localhost:8000/api/v1/categories/find?categoryId=' +categoryId)
            .then((response) => { return response.json() }))
    });
}

export default function CategoryDetail() {
    const { categoryId } = useParams();
    const [category, setCategories] = useState({})

    useEffect(() => {
        getCategoryById(categoryId)
            .then((category) => {
                setCategories(category)
            })
    }, [])

    return (
        <div >
            <MainHeader></MainHeader>
            <Card className={styles.cardClass}>
                <Link href="/">
                    <IconButton size="large"><ArrowBackIosNewIcon /></IconButton>
                </Link>
                <CardHeader
                    style={{color: "#5E7CE2"}}
                    title="Category Information"
                >
                </CardHeader>
                <CardContent className={styles.informationContent}>
                    <p className={styles.mainLabelTitle}>Category</p>
                    <p className={styles.textValue}>{category.title}</p>
                    <Divider />
                    <p className={styles.mainLabelTitle}>Description</p>
                    <p className={styles.textValue}>{category.description}</p>
                </CardContent>
            </Card>
        </div>
    );
};