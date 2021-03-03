import React, { Component } from "react"
import { connect } from "react-redux"
import { useSelector } from "react-redux"
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components'
import { Route, Redirect, useHistory } from "react-router-dom"
import styles from '../Styles/Login.module.css';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Divider } from "@material-ui/core";
const Login1 = props => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const isAuth = useSelector((state) => state.auth.isAuth)
    const error = useSelector((state) => state.auth.error)
    const errormsg= useSelector((state) => state.auth.errormsg)
    const userData = useSelector((state) => state.auth.userdata)
    const history = useHistory()
    const handleClick = () => {
        history.push("/register")
    }
 
    return (

        <div style={{height:"100%",padding:"20px", backgroundColor:"Pink"}} className={styles.container} >
            <div className={styles.container_left}>
                <h1>Sign-in</h1>
               
                <div className={styles.container_left_mid}>
                    <div>
                        <TextField
                            type="text"
                            value={email}
                            label="Email Id"
                            variant="outlined"
                            onChange={e => setEmail(e.target.value)}
                            fullWidth={true}
                            required />
                    </div>
                    <div>
                        <TextField
                            type="password"
                            value={password}
                            label="Password"
                            variant="outlined"
                            fullWidth={true}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                    </div>
                </div>
                <div className={styles.container_left_checkbox}><CheckBoxIcon color="primary"/><span> Keep me signed in</span></div>
                <div onClick={()=>props.handleSubmit(email,password)} className={styles.login_button}>Login</div>
                {
                    error && <div>{errormsg}</div>
                }
            </div>
            <Divider orientation="vertical"/>
            <div className={styles.container_right}>
                <div>
                    <button className={styles.container_right_white}><img src={process.env.PUBLIC_URL + '/shine_images/google_logo.png'} alt=""/> Sign in with google</button>
                    <button className={styles.container_right_white}><img src={process.env.PUBLIC_URL + '/shine_images/linkedin_logo.png'} alt=""/> Sign in with Linkedin</button>
                    <button className={styles.container_right_white}><img src={process.env.PUBLIC_URL + '/shine_images/fb_logo.png'} alt=""/> Sign in with Facebook</button>
                </div>
                <div>
                    <div>Dont have a shine account?</div>
                    <button className={styles.register_button} onClick={handleClick}>Register Now</button >
                </div>
            </div>
            {isAuth &&  <Redirect to="/products" /> }
        </div>
    )
}
export { Login1 }