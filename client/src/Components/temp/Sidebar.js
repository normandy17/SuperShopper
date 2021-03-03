import React, { Component } from "react"
import {DataContext} from "../../Context/DataContextProvider"
import { Link } from "react-router-dom"
import styles from "./Components.module.css"

class Sidebar extends Component{
    constructor(props){
        super(props)
        
    }

    componentDidMount(){
        const {getProducts}= this.context
        getProducts();
    }

    render(){
        const{categories}=this.context
        console.log(categories)
        return(
            <div>
                
                <div className={styles.sidebar}>
                    <h2>Filter and Sort</h2>
                    <select>
                    {
                    categories?.map((item)=>(
                    <option value={item}>{item}</option>
                    ))
                }
                    </select>

                    <h3>Price Range</h3>
                    <div>
                        <input type="number" placeholder="MIN"></input>
                        <input type="number" placeholder="MAX"></input><br/>
                        <button>Search</button>
                    </div>

                    <div>
                        <input type="checkbox" name="Discounts"></input>
                        <label for="Discounts"> Only Discounted Products</label><br/> 
                        <input type="checkbox" name="Avalability"></input>
                        <label for="Discounts"> Products in Stock Only</label><br/>  
                    </div>
                    
                        </div>            
            </div>
        )
    }
}

Sidebar.contextType=DataContext

export {Sidebar}