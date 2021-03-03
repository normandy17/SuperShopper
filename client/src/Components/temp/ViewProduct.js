import React, { Component } from "react"
import {DataContext} from "../Context/DataContextProvider"

class ViewProduct extends Component{
    constructor(props){
        console.log(props)
        super(props)
        this.state={
            product:null
        }
    }

    componentDidMount(){
        this.setState((prev)=>{
            return{
                loading:false
            }
        })
        const{getProductById}=this.context
        const{id}=this.props.match.params
        console.log(id)
        this.setState({
            product:getProductById(id),
            loading:false
        })
        
    }

    render(){
        const{handleAdd}=this.context
        const{product}= this.state
        
        if(!product){
            return <div>No product found</div>
        }
        return(
            <div style={{display:"flex"}}>
                <div><img src={product.Image_Urls[2]} alt="img" srcset="" width="400px"/></div>
                <div style={{textAlign:"left", marginLeft:"20px"}}>
                <h1>{product.Product_Title}</h1>
                <h3>Description:{product.Product_Description}</h3>
                <h3>Brand:{product.Brand}</h3>
                <h3>Quantity:{product.Pack_Size}</h3>  
                <h3>Offers:{product.Offers}</h3>              
                <div><a style={{textDecoration:"line-through"}}> ₹{product.Mrp}</a>  <a> ₹{product.Price} Only</a></div>
                <h3>In Stock:{product.Availibility}</h3>
                <br/>  
                <button onClick={()=>handleAdd(product)}>Add to Cart</button>
            </div></div>
        )
    }
}

ViewProduct.contextType=DataContext

export {ViewProduct}