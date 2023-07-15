'use client'
import {Suspense, useEffect, useState} from "react";
import {ButtonGroup, InputLabel, Select, FormControl, MenuItem, TextField} from "@mui/material";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import {Link, useNavigate} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MainHeader from "@/app/mainHeader";
import styles from "@/app/products.module.css";
import {color, fontFamily} from "@mui/system";

export function insertProductOnDB(payload) {
    // Fetch data from API
    return new Promise((resolve) => {
        resolve(fetch('http://localhost:8000/api/v1/products/', {
            body: payload,
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST'
        })
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

export default function ProductCreate() {
    const [productInfo, setProduct] = useState({})
    const [categories, setCategories] = useState([])
    const [categoryName, setCategoryName] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const history = useNavigate();

    useEffect(() => {
        getCategories()
            .then(categories => {
                setCategories(categories)
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

    function insertProduct(e) {
        const payload = {
            title,
            description,
            price,
            categoryId
        }
        insertProductOnDB(JSON.stringify(payload))
            .then((category) => {
                history('/', {replace: true});
            });
    }
    return (
        <div>
            <MainHeader></MainHeader>
            <Card className={styles.cardClass}>
                <Link to={"/"}>
                    <IconButton size="large"><ArrowBackIosNewIcon /></IconButton>
                </Link>
                <CardHeader
                    style={{color: "#5E7CE2"}}
                    title="Insert a new product"
                >
                </CardHeader>
                <CardContent>
                    <FormControl
                        sx={{ m: 1, minWidth: 300 }} fullWidth={true} margin="dense"
                    >
                        <TextField
                            id="title-product"
                            label="Title"
                            variant="outlined"
                            type="text"
                            margin="dense"
                            onChange={handleChangeField}
                        />
                        <TextField
                            id="description-product"
                            label="Description"
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
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="dense"
                            onChange={handleChangeField}
                        />
                        <p className={styles.textValue}>Category</p>
                        <Select
                            labelId="demo-simple-select-label"
                            id="select-category"
                            label=""
                            type="text"
                            onChange={handleChange}
                            margin="dense"
                        >
                            <InputLabel id="select-category" margin="dense">{categoryName}</InputLabel>
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
                            onClick = {insertProduct}
                        >
                            Add Product
                        </Button>
                    </FormControl>
                </CardContent>
            </Card>
        </div>
    );
};