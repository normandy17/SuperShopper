import React, { useState } from 'react'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useHistory } from 'react-router-dom';
import { AddtoCart, RemovefromCart } from '../Redux/ProductsRedux/actions'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Payment from './Payment';





const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    order: {
        background: "#082436",
        color: "white",
        fontFamily: "Alex Brush",
        textTransform: "none",
        fontStretch: "100px",
        marginTop: "30px",
        width: "400px",
        height: "50px",
        fontSize: "40px",
        fontWeight: "600",
        "&:hover": {
            backgroundColor: 'red',

        }
    },
    empty: {
        margin: "auto",
        background: "red",
        color: "white",
        fontFamily: "Alex Brush",
        textTransform: "none",
        fontStretch: "100px",
        marginTop: "30px",
        width: "max-content",
        borderRadius: "10px",
        padding: "20px",
        height: "max-content",
        fontSize: "40px",
        fontWeight: "600"

    }

});

const Cart = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.products.cart)
    const location = useSelector((state) => state.auth.location)
    const userData = useSelector((state) => state.auth.userdata)
    const history = useHistory()
    const classes = useStyles();
    const [name, setName] = React.useState(userData.name || "")
    const [mobile, setMobile] = React.useState(userData.mobile || "")
    const [add1, setAdd1] = React.useState(location.name || "")
    const [street, setStreet] = React.useState(location.street || "")
    const [district, setDistrict] = React.useState(location.county || "")
    const [state, setState] = React.useState(location.region || "")
    const [pincode, setPincode] = React.useState(location.postal_code || "")
    const [done, setDone] = React.useState(false)
    const [ordeets, setOrdeets] = React.useState({})

    console.log(userData)
    var sum = 0
    var tot = 0
    var disc = 0
    var mrptot = 0

    for (var i = 0; i < cart.length; i++) {
        sum += (cart[i].quantity * cart[i].mdp)
        mrptot += (cart[i].quantity * cart[i].mrp)
        tot += cart[i].quantity
        disc += ((cart[i].mrp - cart[i].mdp) * cart[i].quantity)
    }
    if (sum < 700) var billtot = sum + 49
    else billtot = sum

    const handleAdd = (product) => {
        dispatch(AddtoCart(product))
    }
    const handleRemove = (id) => {
        dispatch(RemovefromCart(id))
    }

    const handleCClick = (id) => {
        history.push(`/products/${id}`)
    }

    const handleClick = () => {
        history.push(`/cart`)
    }

    const handleNext = () => {
        const payload = {
            cart: cart,
            userData:userData,
            billtotal: billtot,
            address: {
                name: name,
                mobile: mobile,
                add1: add1,
                street: street,
                district: district,
                state: state,
                pincode: pincode
            }
        }
        setOrdeets(payload)
        setDone(true)
    }

    const handleBack = () => {
        setDone(false)
    }

    if (cart.length == 0) return <div className={classes.empty}>Your cart is Empty, Please add something to place an Order</div>
    if (done) return (
    <Payment
    details={ordeets}
    handleback={handleBack}
    ></Payment>)

    return (
        <div>
            <Button className={classes.order} onClick={handleNext}>Place Order</Button>
            <div style={{ display: "flex" }}>
                <Paper style={{ margin: "50px", width: "60%" }} elevation={24} >

                    {
                        cart.map((item) => (
                            <>
                                <div style={{ display: "flex", padding: "20px" }}>
                                    <div style={{ minWidth: "30%", maxWidth: "30%" }}>
                                        <img src={item.image[0]} alt="" srcset="" height="250px" style={{ maxWidth: "100%" }} /></div>
                                    <div style={{ textAlign: "left", marginLeft: "20px" }}>
                                        <div onClick={() => handleCClick(item._id)} style={{ fontSize: "30px", fontFamily: "Alegreya" }}>{item.name}</div><br />
                                        <h3 style={{ color: "green" }}>In Stock:{item.availability ? ("Yes") : ("No")}</h3>
                                        <br />
                                        <div style={{ fontSize: "25px", fontWeight: 600, color: "red" }} >₹ {item.mdp}.00</div><br />
                                        <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                                            <Button onClick={() => handleRemove(item._id)}><RemoveCircleOutlineIcon /></Button>
                                            <Button>{item.quantity}</Button>
                                            <Button onClick={() => handleAdd(item)}><AddCircleOutlineIcon /></Button>
                                        </ButtonGroup></div>

                                </div>
                                <hr />
                                <marquee style={{ marginTop: "5px" }}>♩ ♪ ♫ ♭ ♮ ♯ 𝄪 𝄆 𝄇 𝄈 𝄐 𝄑 𝄒 𝆒 𝆓 𝄫 𝄞 𝄢 𝄡</marquee>
                                <hr />
                            </>
                        ))}
                </Paper>


                <div style={{ margin: "50px", width: "30%", }} elevation={24}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Checkout Summary</Typography>
                            <Typography variant="h5" component="h2">
                                Subtotal: ₹ {sum}.00</Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                No. of Products: {cart.length}</Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                No. of Items: {tot}</Typography>
                            <Typography variant="body2" component="p">
                                You have saved ₹ {disc}.00 ({((disc / mrptot) * 100).toFixed(2)})% on this Order
                        </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                Delivery Fee: {sum > 700 ? ("Free") : ("₹ 49.00")}</Typography>
                            <Typography variant="h5" component="h2">
                                Bill Total: ₹ {billtot}.00</Typography>
                        </CardContent>
                    </Card>

                    <Card className={classes.root} style={{ marginTop: "30px" }}>
                        <CardContent>

                            <Typography variant="h5" component="h2">
                                Delivery Address
        </Typography>
                            <br />
                            <TextField id="filled-basic" label="Name" variant="filled" size="small" value={name} onChange={(e) => setName(e.target.value)} style={{ width: "380px", height: "50px", margin: "5px" }} />
                            <TextField id="filled-basic" label="Mobile" variant="filled" size="small" value={mobile} onChange={(e) => setMobile(e.target.value)} style={{ width: "380px", height: "50px", margin: "5px" }} />
                            <TextField id="filled-basic" label="Address Line 1" variant="filled" size="small" value={add1} onChange={(e) => setAdd1(e.target.value)} style={{ width: "380px", height: "50px", margin: "5px" }} />
                            <TextField id="filled-basic" label="Street" variant="filled" size="small" value={street} onChange={(e) => setStreet(e.target.value)} style={{ width: "380px", height: "50px", margin: "5px" }} />
                            <TextField id="filled-basic" label="District" variant="filled" size="small" value={district} onChange={(e) => setDistrict(e.target.value)} style={{ width: "380px", height: "50px", margin: "5px" }} />
                            <TextField id="filled-basic" label="State" variant="filled" size="small" value={state} onChange={(e) => setState(e.target.value)} style={{ width: "380px", height: "50px", margin: "5px" }} />
                            <TextField id="filled-basic" label="Pin Code" variant="filled" size="small" value={pincode} onChange={(e) => setPincode(e.target.value)} style={{ width: "380px", height: "50px", margin: "5px" }} />
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Button className={classes.order} onClick={handleNext}>Place Order</Button>
        </div>


    )
}


export default Cart
