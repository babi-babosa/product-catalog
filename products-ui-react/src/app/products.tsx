'use client'
import React, {memo, Suspense, useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {ButtonGroup, Pagination, Stack} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TablePagination from '@mui/material/TablePagination';
import {useNavigate , Link, Navigate, Route, Routes, Outlet, Router } from 'react-router-dom'
import styles from './products.module.css';
import {green, grey, pink, red} from "@mui/material/colors";
import SearchBar from "@/app/search/searchBar";

export function getProducts() {
    // Fetch data from API
    return new Promise((resolve) => {
        resolve(fetch('http://localhost:8000/api/v1/products')
            .then((response) => response.json()))
    })
}

export function deleteProduct(productId) {
    // Fetch data from API
    return new Promise((resolve) => {
        resolve(fetch('http://localhost:8000/api/v1/products/' +productId , {
            method: 'DELETE'
        })
            .then((response) => response.status))
    })
}

export default function Products({ productsFiltered }) {
    const [products, setProducts] = useState([])
    const [productId, setProductId] = useState("")
    const history = useNavigate();

    useEffect(() => {
        if(!productsFiltered) {
            getProducts()
                .then((allProducts:any) => {
                    setProducts(allProducts)
                });
        } else {
            setProducts(productsFiltered)
        }
    }, [productsFiltered])


    const handleClick = productId => {
        setProductId(productId);
    };

    const handleButtonClick = (productId) => {
        history('/product/' +productId, {replace: true});
    };

    const deleteProductById = (productId) => {
        deleteProduct(productId)
            .then((response:any) => {
                if(response === 200) {
                    getProducts()
                        .then((allProducts:any) => {
                            setProducts(allProducts)
                        })
                }
            })
    }

    const updatePagination = () => {
        //<TablePagination count={1} page={1} rowsPerPage={2} onPageChange={updatePagination}></TablePagination>
    }

    return (
        <div id="main-products" className={styles.myClass}>
            <TableContainer component={Paper} id="table-of-contents">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Title</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Description</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Price</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Category</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products && products.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell align="left">{row.description}</TableCell>
                                <TableCell align="left">{row.price}</TableCell>
                                <TableCell align="left">
                                    {row.category}
                                    <Link to={"/category/" +row.categoryId}>
                                        <IconButton size="large"><VisibilityIcon sx={{ color: "#0A369D" }}/></IconButton>
                                    </Link>
                                    <Link to={"/category-edit/" +row.categoryId}>
                                        <IconButton size="large"><EditIcon sx={{ color: "#4472CA" }} /></IconButton>
                                    </Link>
                                </TableCell>
                                <TableCell align="left">
                                    <Link to={"/product/" +row._id}>
                                        <IconButton size="large"><EditIcon sx={{ color: "#4472CA" }} /></IconButton>
                                    </Link>
                                    <IconButton size="large" onClick={() => { deleteProductById(row._id) }}><DeleteIcon sx={{ color: red[500] }}/></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell align="center">
                                <Link to={"/add-product"}>
                                    <Button
                                        style={{margin: "auto", width: "100%"}}
                                        startIcon={<AddCircleIcon />}
                                        size="large"
                                    >
                                        Insert Product
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Outlet></Outlet>
        </div>
    );
};