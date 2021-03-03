import React, { useState } from 'react'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { fetchAllProducts } from '../Redux/ProductsRedux/actions'
import Footer from './Footer'
import 'antd/dist/antd.css';
import { Carousel } from 'antd';
import Loading from './loading';
import { useHistory } from 'react-router-dom';
import { Rate } from 'antd';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const Home = () => {


    const products = useSelector(state => state.products.products)
    const bestoffers = useSelector(state => state.products.bestoffers)
    const moreoffers = useSelector(state => state.products.moreoffers)
    const isLoading = useSelector(state => state.products.isLoading)
    const history = useHistory()
    const [offers, setOffers] = useState(null)
    const [offers2, setOffers2] = useState(null)
    const dispatch = useDispatch()
    console.log(isLoading, products)

    React.useEffect(() => {
        if (products.length == 0) dispatch(fetchAllProducts())
    }, [products])



    const contentStyle = {
        height: '250px',
        color: '#ffffff',
        textAlign: 'center',
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        margin: "auto",
        background: ' linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
    };
    const contentStyle2 = {
        borderRadius: "10px",
        maxWidth: "350px",    
        textAlign: 'center',
        alignItems: "center",
        justifyContent: "center",
        margin:"auto"
        
    };

    const handleCClick = (id) => {
        history.push(`/products/${id}`)
    }

    if (isLoading)
        return <Loading></Loading>
    return (
        <div>
            <Carousel autoplay>
                    {
                        bestoffers.length > 0 && bestoffers.map((item) => (
                            <div>
                                <div key={item._id} style={contentStyle} onClick={() => handleCClick(item._id)}>
                                    <img src={item.image[0]} alt="" width="150px" style={{ borderRadius: "70px" }} />
                                    <div style={{ display: "flex", flexDirection: "column", margin: "50px" }}>
                                        <div style={{ fontSize: "40px", fontFamily: "Alegreya" }}>{item.name}</div>
                                        <div style={{ fontSize: "20px", fontFamily: "Alegreya", textDecoration: 'line-through' }}>MRP ₹{item.mrp}</div>
                                        <div style={{ fontSize: "25px", fontFamily: "Alegreya" }}>{item.offer}% OFF</div>
                                        <div style={{ fontSize: "25px", fontFamily: "Alegreya" }}>Now at ₹{item.mdp} Only</div>
                                    </div>
                                    <img src={item.image[1]} alt="" width="100px" style={{ borderRadius: "70px", }} />

                                </div></div>
                        ))
                    }
            </Carousel>

            <div style={{ flexGrow: 1, width: "80%", margin: "auto", marginTop: "-10px", padding: "50px", background: ' linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)' }}>
                <Grid container spacing={3}>
                    {
                        moreoffers.length > 0 && moreoffers.map((item) => (
                            <Grid item xs={12} lg={4}>
                                <Paper key={item._id} style={{ background: "white", height: "500px", width: "400px", padding: "20px" }} onClick={() => handleCClick(item._id)}>
                                    <Carousel autoplay effect="fade" dots="">
                                        {
                                            item.image.length > 0 && item.image.map((item) => (
                                                <div style={{alignContent:"center", textAlign:"center", margin:"auto"}}>
                                                    <img src={item} alt="" height="250px" style={contentStyle2} />
                                                    </div>
                                            ))
                                        }
                                    </Carousel>
                                    
                                    <div style={{ display: "flex", flexDirection: "column", margin: "50px" }}>
                                        <div style={{ fontSize: "20px", fontFamily: "Alegreya" }}>{item.name}</div>
                                        <div><a style={{ fontFamily: "Alegreya", textDecoration: 'line-through' }}>₹{item.mrp}</a> <a style={{ fontFamily: "Alegreya" }}>Now at ₹{item.mdp} Only</a></div>
                                        <div style={{ fontFamily: "Alegreya" }}>{item.offer}% OFF</div>
                                        <Rate disabled defaultValue={item.product_rating} />

                                    </div>
                                </Paper>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>

            <Footer></Footer>

        </div>
    )
}


export default Home
