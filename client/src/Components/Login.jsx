import React, { Component } from "react"
import { useSelector } from "react-redux"
import TextField from '@material-ui/core/TextField';
import { Route, Redirect, useHistory } from "react-router-dom"
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Divider } from "@material-ui/core";
import { useDispatch } from "react-redux"
import { Loginreq } from "../Redux/user/actions";

const Login = props => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const isAuth = useSelector((state) => state.auth.isAuth)
    const userData = useSelector((state) => state.auth.userdata)
    const history = useHistory()
    const dispatch = useDispatch()
    const handleClick = () => {
        history.push("/register")
    }

    const handleSubmit=()=>{
        dispatch(Loginreq(email,password))
    }
 
    return (

        <div style={{ backgroundImage:`url('back1.JPG')`,height:"100%",padding:"20px"}} >
            <div >
                <h1>Sign-in</h1>
                { ( isAuth && !userData ) && <div style={{fontSize:"16px"}}>This email-id is not registered. Please register.</div>}
                <div >
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
                <div ><CheckBoxIcon color="primary"/><span> Keep me signed in</span></div>
                <button onClick={()=>handleSubmit()} >Login</button>
            </div>
            <Divider orientation="vertical"/>
            <div >
                <div>
                    <button ><img src={process.env.PUBLIC_URL + '/shine_images/google_logo.png'} alt=""/> Sign in with google</button>
                    <button ><img src={process.env.PUBLIC_URL + '/shine_images/linkedin_logo.png'} alt=""/> Sign in with Linkedin</button>
                    <button ><img src={process.env.PUBLIC_URL + '/shine_images/fb_logo.png'} alt=""/> Sign in with Facebook</button>
                </div>
                <div>
                    <div>Dont have a shine account?</div>
                    <button  onClick={handleClick}>Register Now</button >
                </div>
            </div>
            {isAuth &&  <Redirect to="/cart" />}
        </div>
    )
}
export default Login