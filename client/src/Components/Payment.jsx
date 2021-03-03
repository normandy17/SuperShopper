import React from "react"
import { Link, Route } from "react-router-dom"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useHistory } from 'react-router-dom';
import { AddtoCart, clearCart, RemovefromCart } from '../Redux/ProductsRedux/actions'
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
import { Paymentreq,orderAdd } from "../Redux/orders/actions";
import Axios from "axios"
import { addOrder } from "../Redux/user/actions"


const Payment = (props) => {

    const [success, setSuccess] = React.useState(false)
    const userData = useSelector((state) => state.auth.userdata)

    const dispatch = useDispatch()
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
    const classes = useStyles();
    console.log(props.details.userData)
    const order = props.details.userData.name.slice(0, 4)+Date.now()

    const history = useHistory()
    const handlePay = async (e) => {
        e.preventDefault()

        const payload = {
            amount: props.details.billtotal,
            userData: props.details.userData,
            billnum: order,
            cart: props.details.cart
        }

        const payload2 = {
            amount: props.details.billtotal,
            billnum: order,
            cart: props.details.cart,
            date:Date.now()
        }



        const response = await dispatch(Paymentreq(payload))
        const { data } = await response

        const options = {
            name: "Super Shopper",
            description: `Payment for Order:${order}`,
            order_id: data.id,
            handler: async (response) => {
                try {
                    const paymentId = response.razorpay_payment_id;
                    const url = `http://localhost:8001/capture/${paymentId}`;
                    const captureResponse = await Axios.post(url, {})
                    const successObj = JSON.parse(captureResponse.data)
                    const captured = successObj.captured;
                    console.log('success')
                    alert("Order Placed Sucessfully")
                    dispatch(orderAdd(payload))
                    dispatch(addOrder(props.details.userData._id,payload2))
                    history.push("/products")
                    dispatch(clearCart())
                    setSuccess(true)
                    
                } catch (err) {
                    console.log(err);
                }
            },
            theme: {
                color: "#082436",
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    if (success) {
        return (
            <div>Your order has been placed successfully</div>
        )
    }
    return (
        <div>
            <div className={classes.empty} >Review your Order</div>
            <div style={{ display: "flex" }}>
                <Paper style={{ margin: "50px", width: "60%" }} elevation={24} >

                    {
                        props.details.cart.map((item) => (
                            <>
                                <div style={{ display: "flex", padding: "20px" }}>
                                    <div style={{ minWidth: "20%", maxWidth: "20%" }}>
                                        <img src={item.image[0]} alt="" srcset="" height="100px" style={{ maxWidth: "100%" }} /></div>
                                    <div style={{ fontSize: "30px", fontFamily: "Alegreya", width: "50%" }}>{item.name}</div>
                                    <div style={{ fontSize: "25px", fontWeight: 600, color: "red", width: "15%" }} >₹ {item.mdp}.00</div>
                                    <div style={{ fontSize: "25px", fontWeight: 600, color: "red", width: "15%" }} > {item.quantity} Nos.</div>
                                </div>
                                <hr />
                            </>
                        ))}
                </Paper>


                <div style={{ margin: "50px", width: "30%", }} elevation={24}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Order Summary</Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                No. of Products: {props.details.cart.length}</Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                Items Total: {props.details.billtotal < 700 ? (props.details.billtotal - 49) : (props.details.billtotal)}</Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                Shipping and Handling: {props.details.billtotal > 700 ? ("Free") : ("₹ 49.00")}</Typography>
                            <Typography variant="h5" component="h2">
                                Order Total: ₹ {props.details.billtotal}.00</Typography>
                        </CardContent>
                    </Card>

                    <Card className={classes.root} style={{ marginTop: "30px" }}>
                        <CardContent>

                            <Typography variant="h5" component="h2">
                                Delivery Address
    </Typography>
                            <br />
                            <TextField id="filled-basic" InputProps={{ readOnly: true }} label="Name" variant="outlined" size="small" value={props.details.address.name} style={{ width: "380px", height: "50px", margin: "5px" }} />
                            <TextField id="filled-basic" InputProps={{ readOnly: true }} label="Mobile" variant="outlined" size="small" value={props.details.address.mobile} style={{ width: "380px", height: "50px", margin: "5px" }} />
                            <TextField id="filled-basic" InputProps={{ readOnly: true }} label="Address Line 1" variant="outlined" size="small" value={props.details.address.add1} style={{ width: "380px", height: "50px", margin: "5px" }} />
                            <TextField id="filled-basic" InputProps={{ readOnly: true }} label="Street" variant="outlined" size="small" value={props.details.address.street} style={{ width: "380px", height: "50px", margin: "5px" }} />
                            <TextField id="filled-basic" InputProps={{ readOnly: true }} label="District" variant="outlined" size="small" value={props.details.address.district} style={{ width: "380px", height: "50px", margin: "5px" }} />
                            <TextField id="filled-basic" InputProps={{ readOnly: true }} label="State" variant="outlined" size="small" value={props.details.address.state} style={{ width: "380px", height: "50px", margin: "5px" }} />
                            <TextField id="filled-basic" InputProps={{ readOnly: true }} label="Pin Code" variant="outlined" size="small" value={props.details.address.pincode} style={{ width: "380px", height: "50px", margin: "5px" }} />
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Button className={classes.order} style={{ background: "yellow", color: "#082436", marginRight: "10px" }} onClick={props.handleback}>Go Back</Button>
            <Button className={classes.order} onClick={handlePay} >Make Payment</Button>

        </div>
    )
}

export default Payment