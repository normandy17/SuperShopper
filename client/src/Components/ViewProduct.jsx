import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { AddtoCart, deleteProduct } from '../Redux/ProductsRedux/actions'
import { useParams } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import { fetchProduct } from '../Redux/ProductsRedux/actions'
import EditProduct from './editProduct'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useHistory } from "react-router-dom"
import Loading from './loading';
import { set } from 'mongoose'



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: "60%"
    },

}));

const ViewProduct = () => {
    const { id } = useParams()
    const isLoading = useSelector(state => state.products.isLoading)
    const product = useSelector(state => state.products.currproduct)
    var image = useSelector(state => state.products.currimage)
    console.log(isLoading,product)
    React.useEffect(() => {
        dispatch(fetchProduct(id))
    }, [])
    React.useEffect(() => {
        console.log("rerend")
        setCurrImage(image)
    }, [image])
    const dispatch = useDispatch()
    
    
    console.log(image)
    const userType = useSelector((state) => state.auth.userType)
    var [currimage, setCurrImage] = React.useState(image)

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    // var temp=JSON.parse(product.product_specifications)
    const history = useHistory()
    console.log(product)

    

    const handleAdd = (product) => {
        dispatch(AddtoCart(product))
    }
    const handleOpen = () => {
        console.log("1")
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async (id) => {
        const reply = await dispatch(deleteProduct(id))
        if (reply) {
            alert("Successfully Deleted Product")
            history.goBack()
        }
        else alert("Deletion Failed")

    }

    if (isLoading || !product) return <Loading></Loading>
  

    else return (
        <div style={{ display: "flex" }}>
            <div style={{ display: "flex", flexDirection: "column", margin: "30px" }}>
                {
                    product.image.map((item) => (
                        <div style={{ height: "50px", width: "50px", border: "1px solid black", margin: "5px", padding: "5px" }} onMouseOver={() => setCurrImage(item)} >
                            <img src={item} alt="" srcset="" height="40px" style={{ maxWidth: "40px" }} /></div>
                    ))
                }
            </div>
            <div style={{ minWidth: "500px", margin: "30px" }}><img src={currimage} alt="img" srcset="" Height="500px" style={{ maxWidth: "500px" }} /></div>
            <div style={{ textAlign: "left", margin: "30px" }}>
                <h1>{product.name}</h1>
                <div>Visit the {product.brand} Store</div><hr />

                <h3>Brand:{product.brand}</h3>

                {product.offer > 0 ? (
                    <>
                        <h3 >MRP: ₹<a style={{ textDecoration: "line-through" }}> {product.mrp}.00</a></h3>
                        <h3 >Price: ₹<a style={{ color: "red" }} Only> {product.mdp}.00</a></h3>
                        <h3>You Save: ₹{product.mrp - product.mdp}.00({product.offer}%)</h3>

                    </>) : (<div><a> ₹{product.mdp}.00 Only</a></div>)
                }
                {product.mdp > 700 ? (

                    <h3 >Free Delivery by {(new Date(Date.now() + 172800000)).toLocaleTimeString(undefined, options)}</h3>
                ) : (<h3 >Delivery by {(new Date(Date.now() + 172800000)).toLocaleTimeString(undefined, options)} for ₹20 only</h3>)
                }
                <h3>In Stock:{product.availability ? ("Yes") : ("No")}</h3>
                <br />
                {userType == "admin" ? (
                    <div style={{ display: "flex" }}>
                        <button onClick={() => handleOpen()}>Edit Product</button>
                        <button style={{ marginLeft: "10px" }} onClick={() => handleDelete(product._id)}>Delete Product</button>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={open}>
                                <div className={classes.paper}>
                                    <EditProduct
                                        handleClose={handleClose}
                                        product={product} />
                                </div>
                            </Fade>
                        </Modal>
                    </div>
                ) : (<button onClick={() => handleAdd(product)}>Add to Cart</button>)}

                <hr />
                <Paper variant="outlined" style={{ maxHeight: 200, overflow: 'auto', padding: "10px" }} >
                    {product.description}
                </Paper>
            </div>
            <div></div>

        </div>
    )
}


export default ViewProduct
