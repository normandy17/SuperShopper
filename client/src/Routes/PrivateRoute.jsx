import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useSelector } from "react-redux"

export const PrivateRoute = ({ Component, ...rest }) => {
    const isAuth = useSelector((state) => state.auth.isAuth)
    return (
        
           
                 
                   isAuth ? (
                        <Route{...rest} render={(props) => <Component {...props} />} />
                    ) : (
                            <Redirect to="/login" />
                        )
               
            
       
    )
}
