'use client'
import {Suspense, useEffect, useState} from "react";
import Button from '@mui/material/Button';
import {ButtonGroup, InputLabel, Select, FormControl, MenuItem, TextField} from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {useParams} from "react-router";
import CardHeader from "@mui/material/CardHeader";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {insertProductOnDB} from "@/app/product/productAdd";
import {Link, useNavigate} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import MainHeader from "@/app/mainHeader";
import styles from "@/app/products.module.css";

export function getProductInfo(productId) {
    // Fetch data from API
    return new Promise((resolve) => {
        resolve(fetch('http://localhost:8000/api/v1/products/' +productId)
            .then((response) => response.json()))
    })
}

export function getCategories() {
    // Fetch data from API
    return new Promise((resolve) => {
        resolve(fetch('http://localhost:8000/api/v1/categories/')
            .then((response) => response.json()))
    })
}

export function getCategoryById(categoryId) {
    // Fetch data from API
    return new Promise((resolve) => {
        resolve(fetch('http://localhost:8000/api/v1/categories/find?categoryId=' +categoryId)
            .then((response) => { return response.json() }))
    });
}

export function updateProductOnDB(payload, productId){
    // Fetch data from API
    return new Promise((resolve) => {
        resolve(fetch('http://localhost:8000/api/v1/products/' +productId, {
            body: payload,
            headers: {
                "Content-Type": "application/json",
            },
            method: 'PUT'
        })
            .then((response) => response.json()))
    })
}

export default function Product() {
    const { productId } = useParams();
    const [productInfo, setProduct] = useState({})
    const [categories, setCategories] = useState([])
    const [categoryName, setCategoryName] = useState("")
    const [categoryId, setCategoryId] = useState(undefined)
    const [title, setTitle] = useState(undefined)
    const [description, setDescription] = useState(undefined)
    const [price, setPrice] = useState(undefined)
    const history = useNavigate();

    useEffect(() => {
        getProductInfo(productId)
            .then((product:any) => {
                setProduct(product);
                setTitle(product.title);
                setDescription(product.description);
                setPrice(product.price);
                getCategoryById(product.categoryId)
                    .then((category) => {
                        setCategoryName(category.title);
                        getCategories()
                            .then(categories => {
                                setCategories(categories)
                            })
                    })
            })
    }, [])

    function handleChange(e) {
        setCategoryId(e.target.value)
        getCategoryById(e.target.value)
            .then((category) => {
                setCategoryName(category.title);
            })
    }

    function handleChangeField(e) {
        switch(e.target.id){
            case "title-product":
                setTitle(e.target.value);
                break;
            case "description-product":
                setDescription(e.target.value);
                break;
            case "price-product":
                setPrice(parseFloat(e.target.value)) ;
                break;
        }
    }

    function updateProduct(e) {
        const payload = {
            updateFilters : {
                title,
                description,
                price,
                categoryId
            }
        }
        updateProductOnDB(JSON.stringify(payload), productId)
            .then((category) => {
                history('/', {replace: true});
            });
    }
    return (
        <>
            <MainHeader></MainHeader>
            <Card className={styles.cardClass}>
                <Link to={"/"}>
                    <IconButton size="large"><ArrowBackIosNewIcon /></IconButton>
                </Link>
                <CardHeader
                    title={"Update Product - " +productInfo.title}
                    style={{color: "#5E7CE2"}}
                >
                </CardHeader>
                <CardContent>
                    <FormControl sx={{ m: 1, minWidth: 300 }} fullWidth={true} margin="dense">
                        <TextField
                            id="title-product"
                            placeholder={productInfo.title}
                            variant="outlined"
                            type="text"
                            margin="dense"
                            onChange={handleChangeField}
                        />
                        <TextField
                            id="description-product"
                            placeholder={productInfo.description}
                            variant="outlined"
                            type="text"
                            margin="dense"
                            onChange={handleChangeField}
                        />
                        <TextField
                            id="price-product"
                            label="Price"
                            type="number"
                            variant="outlined"
                            placeholder={productInfo.price}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="dense"
                            onChange={handleChangeField}
                        />
                        <Select
                            labelId="select-category"
                            id="select-category"
                            label="Insert a category"
                            type="text"
                            onChange={handleChange}
                        >
                            {categories && categories.map(category => (
                                <MenuItem key={category._id}
                                          value={category._id}
                                >
                                    {category.title}
                                </MenuItem>
                            ))}
                        </Select>
                        <Button
                            style={{margin: "auto", width: "100%"}}
                            startIcon={<AddCircleIcon />}
                            type="submit"
                            onClick = {updateProduct}
                        >
                            Update Product
                        </Button>
                    </FormControl>
                </CardContent>
            </Card>
        </>
    );
};