import React, { Component } from "react"
import {DataContext} from "../../Context/DataContextProvider"
import { Link } from "react-router-dom"
import { Sidebar } from "../Sidebar"
import { Pagination } from "../Pagination"
import styles from "./Components.module.css"


class Products extends Component{
    constructor(props){
        super(props)
        this.state={
            loading:true,
            currentPage:1
        }
        
    }

    componentDidMount(){
        const {getProducts}= this.context
        getProducts();
    }

    

    render(){
        const{products,isLoading}= this.context
        var{currentPage}=this.state
        const lastProduct=currentPage*18
        const firstProduct=lastProduct-18
        const currentProducts=products.slice(firstProduct,lastProduct)
        const paginate = (pageNumber) => {
            if(pageNumber=="p")currentPage--
            else if(pageNumber=="n")currentPage++
            else currentPage=pageNumber
            this.setState({
            currentPage:currentPage
        })}
        if(isLoading){
            return(
                <div>Loading...</div>
            )
        }
        return(
            <div style={{display:"flex"}}>
            <div style={{width:"25%"}}><Sidebar></Sidebar></div>
            
            <div className={styles.main}>
                {
                    currentProducts?.map((item) => (
                        <div className={styles.display}>
                            <Link to={`/products/${item.UID}`}>{item.Product_Title}
                    <br/><br/>MRP ₹{item.Mrp}<br/>{item.Offers}% OFF<br/>Now ₹{item.Price}</Link>

                        </div>
                    ))
                }
                <Pagination 
                postsPerPage={50}
                totalPosts={10000}
                paginate={paginate}
                ></Pagination>
            </div></div>
        )
    }
}

Products.contextType=DataContext

export {Products}