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
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Link from 'next/link'

export function getCategoryById(categoryId :string) {
    // Fetch data from API
    return new Promise((resolve) => {
        resolve(fetch('http://localhost:8000/api/v1/categories/find?categoryId=' +categoryId)
            .then((response) => { return response.json() }))
    });
}

export function updateCategoryOnDB(payload: any, productId: string){
    // Fetch data from API
    return new Promise((resolve) => {
        resolve(fetch('http://localhost:8000/api/v1/categories/' +productId, {
            body: payload,
            headers: {
                "Content-Type": "application/json",
            },
            method: 'PUT'
        })
            .then((response) => response.json()))
    })
}

export default function CategoryUpdate() {
    const { categoryId } = useParams();
    const [category, setCategories] = useState({})
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        getCategoryById(categoryId)
            .then((category) => {
                setCategories(category)
                setTitle(category.title);
                setDescription(category.description);
            })
    }, [])

    function handleChangeField(e) {
        switch(e.target.id){
            case "title-category":
                setTitle(e.target.value);
                break;
            case "description-category":
                setDescription(e.target.value);
                break;
        }
    }

    function updateCategory(e) {
        const payload = {
            updateFilters : {
                title,
                description,
            }
        }
        updateCategoryOnDB(JSON.stringify(payload), categoryId)
    }

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
                    <FormControl sx={{ m: 1, minWidth: 300 }} fullWidth={true} margin="dense">

                    <p className={styles.mainLabelTitle}>Category</p>
                    <TextField
                        id="title-category"
                        placeholder={category.title}
                        variant="outlined"
                        type="text"
                        margin="dense"
                        onChange={handleChangeField}
                    />
                    <Divider />
                    <p className={styles.mainLabelTitle}>Description</p>
                    <TextField
                        id="description-category"
                        placeholder={category.description}
                        variant="outlined"
                        type="text"
                        margin="dense"
                        onChange={handleChangeField}
                    />
                    <Button
                        style={{margin: "auto", width: "100%"}}
                        startIcon={<AddCircleIcon />}
                        type="submit"
                        onClick = {updateCategory}
                    >
                        Update Category
                    </Button>
                    </FormControl>
                </CardContent>
            </Card>
        </div>
    );
};