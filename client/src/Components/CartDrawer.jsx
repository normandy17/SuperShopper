import React, { useState } from 'react'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { AddtoCart,RemovefromCart } from '../Redux/ProductsRedux/actions'
import { useParams } from "react-router-dom"
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { Drawer } from "antd";
import { useHistory } from 'react-router-dom';



const CartDrawer = (props) => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.products.cart)
    const auth = useSelector(state => state.auth.isAuth)
    const history = useHistory()

    React.useEffect(() => {        
        console.log("cart drawer")
    }, [cart])

   var sum = 0
    var tot = 0
    for (var i = 0; i < cart.length; i++) {
        sum += (cart[i].quantity * cart[i].mdp)
        tot += cart[i].quantity
    }

    const handleAdd = (product) => {
        dispatch(AddtoCart(product))
    }
    const handleRemove = (id) => {
        dispatch(RemovefromCart(id))
    }

    const handleClick = () => {
        if(auth){
            history.push(`/cart`)
            props.setvis(false)
        }
        else alert("Please login to Proceed")
    }

    return (
        <Drawer
                    title="Your Shopping Cart"
                    placement="right"
                    width={350}
                    onClose={props.onClose}
                    visible={props.visible}
                >
                    <div>
                        <div style={{ margin: "auto", textAlign: "center" }}>Subtotal: ₹ {sum}.00</div>
                        <Button style={{ marginLeft: "50px" }} onClick={handleClick}>proceed to Checkout</Button><hr />
                        <div>
                            {
                                cart.map((item) => (
                                    <div style={{ textAlign: "center", justifyContent: "center",  height: "max-content" }}>
                                        <img src={item.image[0]} alt="" srcset="" height="100px" style={{ maxWidth: "350px" }} />
                                        <marquee >{item.name}</marquee>
                                        <div >₹ {item.mdp}.00</div>
                                        <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                                            <Button onClick={()=>handleRemove(item._id)}><RemoveCircleOutlineIcon/></Button>
                                            <Button>{item.quantity}</Button>
                                            <Button onClick={()=>handleAdd(item)}><AddCircleOutlineIcon/></Button>
                                        </ButtonGroup>
                                        <div>
                                        
                                        </div><hr />
                                    </div>

                                ))}
                        </div>
                    </div>
                </Drawer>
    )
}


export default CartDrawer
