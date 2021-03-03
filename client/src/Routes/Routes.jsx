import React from "react"
import {Route, Switch} from "react-router-dom"
import  Home  from "../Components/Home"
import { Navbar } from "../Components/Navbar"
import { About } from "../Components/About"
import { Contact } from "../Components/Contact"
import  ViewProduct  from "../Components/ViewProduct"
import  Products  from "../Components/Products"
import  Cart  from "../Components/Cart"
import  Login  from "../Components/Login"
import {PrivateRoute} from "./PrivateRoute"
import Orders from "../Components/orders"

const Routes=()=>{
    return(
        <div>
            <Route path="/" render={()=><Navbar />} />
            <Switch>
            <Route path="/" exact render={()=> <Home />} />
            <Route path="/about" render={()=> <About />} />
            <Route path="/contact" exact render={()=> <Contact />} />
            <Route path="/products" exact render={()=><Products/>} />
            <Route 
            path="/products/:id" 
            exact 
            render={(props)=><ViewProduct {...props} />} />
            <PrivateRoute path="/cart" component={Cart} />
            <Route path="/orders" render={()=> <Orders/>} />
            <Route path="/login" render={()=> <Login />} />
            <Route render={()=><h3>Error 404 Page not Found</h3>} />
            </Switch>
        </div>
    )
}

export {Routes}