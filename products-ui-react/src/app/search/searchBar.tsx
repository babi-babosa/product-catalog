"use client"
import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import styles from './searchBar.module.css'
import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({handleClick}) {
    const [searchParams, setParamsToSearch] = useState("")

    function handleChangeField(e) {
        setParamsToSearch(e.target.value);
    }

    function searchForProducts(){
        handleClick(searchParams);
    }
  return (
      <div id="search-bar" className={styles.searchBar}>
          <h2>
              Smartex Product Catalog
          </h2>
          <div className={styles.searchFieldText}>
              <TextField
                  id="input-with-icon-textfield"
                  placeholder="...search here"
                  variant="standard"
                  className={styles.textFieldSearch}
                  onChange={handleChangeField}
              />
              <Button variant="contained"
                      sx={{ background: "#CFDEE7", color: "#0A369D" }}
                      startIcon={<SearchIcon />}
                      onClick = {searchForProducts}
              >Search</Button>
          </div>
      </div>
  );
};