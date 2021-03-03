import React, { useState } from 'react'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import styles from "./Components.module.css"
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import AutorenewTwoToneIcon from '@material-ui/icons/AutorenewTwoTone';

const Sidebar = () => {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.products.categories)
    const [disc, setDisc] = React.useState(false)
    const [avail, setAvail] = React.useState(false)
    const [rating, setRating] = React.useState(0)


    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: "90%",
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }));
    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        console.log(event.target.value)
    };


    return (
        <div style={{ minWidth: "20%", padding: "10px",color:"white", background: 'linear-gradient(90deg, rgba(252,176,69,1) 0%, rgba(253,29,29,1) 50%, rgba(131,58,180,1) 100%)' }}>
            <div className={styles.sidebar}>
                <h2 style={{ marginTop: "20px", color: "white" }}>Filter and Sort</h2>

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">Sort</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={age}
                        onChange={handleChange}
                    >
                        <MenuItem value="1"><em>Price Ascending</em></MenuItem>
                        <MenuItem value="2"><em>Price Descending</em></MenuItem>
                        <MenuItem value="3"><em>Customer Rating Descending</em></MenuItem>
                        <MenuItem value="4"><em>Discount Ascending</em></MenuItem>
                        <MenuItem value="5"><em></em>Discount Ascending</MenuItem>

                    </Select>

                </FormControl>


                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">Categories</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={age}
                        onChange={handleChange}
                    >
                        <MenuItem value=""><em>All</em></MenuItem>
                        {
                            categories?.map((item) => (
                                <MenuItem value={item}>{item}</MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText>Filter by Category</FormHelperText>
                </FormControl>



                <h2 style={{ marginTop: "20px", color: "white" }}>Price Range</h2>
                <div>
                    <TextField size="small" id="outlined-basic" label="Min" variant="outlined" style={{ width: "120px" }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">₹  </InputAdornment>
                        }} />
                    <TextField size="small" id="outlined-basic" label="Max" variant="outlined" style={{ width: "120px", marginLeft: "10px" }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">₹  </InputAdornment>
                        }} /><br />
                    <Button style={{ color: "white" }} >Search</Button>
                </div>

                <div>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={disc}
                                onChange={() => setDisc(!disc)}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Only Discounted Products"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={avail}
                                onChange={() => setAvail(!avail)}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Products in Stock Only"
                    />

                    <h2 style={{ marginTop: "20px", color: "white" }}>Customer Ratings</h2>
                    <Box component="fieldset" mb={3} borderColor="transparent" style={{ display: "flex", justifyContent: "center" }}>
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            onChange={(event, newValue) => {
                                console.log(newValue);
                                setRating(newValue);
                            }}
                        /><div style={{ marginLeft: "5px", color: "white", fontSize: "larger" }}>& Up</div>
                    </Box>

                    <Button
                        variant="contained"
                        color=""
                        size="large"
                        className={classes.button}
                        startIcon={<AutorenewTwoToneIcon/>}
                    >
                        Reset
      </Button>


                </div>

            </div>
        </div>
    )
}


export default Sidebar
