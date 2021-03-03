import React, { useState } from 'react'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { fetchAllProducts } from '../Redux/ProductsRedux/actions'
import Pagination from '@material-ui/lab/Pagination';
import Sidebar from "./Sidebar"
import Loading from './loading';
import { Carousel } from 'antd';
import { useHistory } from 'react-router-dom';
import { Rate } from 'antd';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const Products = () => {
    const products = useSelector(state => state.products.products)
    const isLoading = useSelector(state => state.products.isLoading)
    
    const [page, setPage] = React.useState(1)
    var currentProducts = products.filter((item, index) => index < page * 18 && index >= (page * 18) - 18)
    const history = useHistory()

    const dispatch = useDispatch()

    React.useEffect(() => {
        if (products.length == 0) dispatch(fetchAllProducts())
    }, [])

    const handleChange = (event, value) => {
        console.log(value);
        setPage(value)

    };

    const contentStyle2 = {
        borderRadius: "10px",
        maxWidth: "350px",
        textAlign: 'center',
        alignItems: "center",
        justifyContent: "center",
        margin: "auto"

    };

    const handleCClick = (id) => {
        history.push(`/products/${id}`)
    }



    if (isLoading) return <Loading></Loading>

    return (
        //filter categories
        <div style={{ display: "flex" }}>
            <Sidebar></Sidebar>

            <div >
                <div style={{ flexGrow: 1, width: "100%", margin: "auto", padding: "50px", background: ' #EAEDED' }}>
                    <Grid container spacing={3}>
                        {
                            currentProducts.length > 0 && currentProducts.map((item) => (
                                <Grid item xs={12} lg={4}>
                                    <Paper key={item._id} style={{ background: "white", height: "500px", width: "400px", padding: "20px" }} elevation={24} onClick={() => handleCClick(item._id)}>
                                        <Carousel autoplay effect="fade" dots="">
                                            {
                                                item.image.length > 0 && item.image.map((item) => (
                                                    <div style={{ alignContent: "center", textAlign: "center", margin: "auto" }}>
                                                        <img src={item} alt="" height="250px" style={contentStyle2} />
                                                    </div>
                                                ))
                                            }
                                        </Carousel>

                                        <div style={{ display: "flex", flexDirection: "column", margin: "50px" }}>
                                            <div style={{ fontSize: "20px", fontFamily: "Alegreya" }}>{item.name}</div>
                                           {item.mrp>0 && item.offer>0 && <div><div><a style={{ fontFamily: "Alegreya", textDecoration: 'line-through' }}>₹{item.mrp}</a> <a style={{ fontFamily: "Alegreya" }}>Now at ₹{item.mdp} Only</a></div>
                                            <div style={{ fontFamily: "Alegreya" }}>{item.offer}% OFF</div></div>}
                                            {item.mrp>0 && item.offer==0 && <div><div> <a style={{ fontFamily: "Alegreya" }}>Now at ₹{item.mdp} Only</a></div>
                                           </div>}
                                            <Rate disabled defaultValue={item.product_rating} />

                                        </div>
                                    </Paper>
                                </Grid>
                            ))
                        }
                    </Grid>
                </div>
                <br />
                <Pagination count={Math.ceil(products.length / 18)} variant="outlined" shape="rounded" onChange={handleChange} />
            </div>
        </div>
    )
}


export default Products
