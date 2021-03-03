import React, {Component} from "react"
import {DataContext} from "../../Context/DataContextProvider"


export class Cart extends Component {
    constructor(props){
        super(props)
    }
        
    render() {
        
        const{cart}=this.context
        var sum=0
        var tot=0
        for(var i=0;i<cart.length;i++){
            sum+=(cart[i].quantity*cart[i].Price)
            tot+=cart[i].quantity
        }
        
        return (
            <div>
            <ol style={{marginLeft:"50px"}} >CART
             {
             cart.map((item)=>(
                 <li style={{textAlign:"center", display:"flex", justifyContent:"center"}}>
                     <div style={{width:"200px"}}>{item.Product_Title.slice(0,30)}</div>
                     <div style={{width:"30px"}}>₹{item.Price}</div>
                     <div style={{width:"30px"}}>{item.quantity}</div>
                 </li>
                 
             )
             )}


            </ol>

             <div>Total {tot} Items <br/>Total Price ₹{sum} </div>
<button>CHECKOUT</button>
</div>
        )
    }
}

Cart.contextType=DataContext
