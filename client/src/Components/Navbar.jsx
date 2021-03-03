import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useSelector } from "react-redux"
import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux"
import { logout, Regreq } from "../Redux/user/actions"
import { Menu as Menu2 } from 'antd';
import 'antd/dist/antd.css';
import styles from '../Styles/SS.module.css';
import { Input, AutoComplete } from "antd";
import { Drawer } from "antd";
import { Login1 } from './Login1';
import { Loginreq } from "../Redux/user/actions";
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import { Register1 } from "./Register";
import Location from "./location";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { AddtoCart, RemovefromCart } from '../Redux/ProductsRedux/actions'
import CartDrawer from "./CartDrawer";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    grow: {
        backgroundColor: "#06181f",

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    paper: {
        position: "absolute",
        margin: "auto",
        height: "500px",
        width: "782px",
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        top: `30%`,
        left: `30%`
    }


}));

const Navbar = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const cart = useSelector(state => state.products.cart)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const products = useSelector(state => state.products.products)
    const isAuth = useSelector((state) => state.auth.isAuth)
    const userData = useSelector((state) => state.auth.userdata)
    const userType = useSelector((state) => state.auth.userType)
    const error = useSelector((state) => state.auth.error)
    const [childrenDrawer, setChildrenDrawer] = React.useState(false)
    const dispatch = useDispatch()
    const history = useHistory()



    //sign in dropdown

    const onClick = ({ key }) => {
        if (key == 6) {
            dispatch(logout())
        };
    };


    const menu = (
        <Menu2 onClick={onClick}>
            <Menu2.Item key="1">My orders</Menu2.Item>
            <Menu2.Item key="2">Returns</Menu2.Item>
            <Menu2.Item key="3">Customer Support</Menu2.Item>
            <Menu2.Item key="4">Services</Menu2.Item>
            <Menu2.Item key="5">Account Settings</Menu2.Item>
            <Menu2.Item key="6">Sign out</Menu2.Item>
        </Menu2>
    );

    //search and AutoComplete
    const [value, setValue] = useState('');

    const onSearch = (searchText) => {
        console.log(searchText)
    };

    const onSelect = (data) => {
        console.log('onSelect', data);
    };

    const onChange = (data) => {
        setValue(data);
    };


    //

    //Drawer
    const [visible, setVisible] = React.useState(false)

    const onClose = () => {
        setVisible(false)
    };


    const showChildrenDrawer = () => {
        setChildrenDrawer(true)
    };
    const showDrawer = () => {
        setVisible(true)
    };


    //register and login

    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);

    const handleCancel = () => {
        setOpen(false);
    };
    const handleCancel2 = () => {
        setOpen2(false);
    };

    const handleSubmit = async (email, password) => {
        const auth = await dispatch(Loginreq(email, password));

        if (auth) handleCancel()
    };

    const handleSubmit2 = async (name, mobile, email, password) => {
        const payload = {
            name: name,
            mobile: mobile,
            email: email,
            password: password,
            type: "user"
        }
        const auth = await dispatch(Regreq(payload));
        if (auth) handleCancel2()
    };

    //cart
    const [visible2, setVisible2] = React.useState(false)
    const onClose2 = () => {
        setVisible2(false)
    };
    const showDrawer2 = () => {
        setVisible2(true)
    };


    //orders
    const handleClickOrders = () => {
        history.push('/orders')
    }


    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div className={classes.grow} >
                <AppBar position="static" style={{ backgroundColor: "#082436", display: "flex" }}>
                    <Toolbar>
                        <div class={styles.container}>
                            <div class={styles.icon1}>
                                <svg viewBox="-5 0 521 512" xmlns="http://www.w3.org/2000/svg"><path d="m473.21875 162.347656c-25.011719-25.007812-58.261719-38.78125-93.628906-38.78125-35.367188 0-68.617188 13.773438-93.625 38.777344 0 .003906-123.5625 123.621094-123.5625 123.621094-16.539063 16.535156-43.445313 16.535156-59.980469 0-8.011719-8.007813-12.421875-18.660156-12.421875-29.988282 0-11.328124 4.410156-21.980468 12.421875-29.988281 8.269531-8.269531 19.128906-12.402343 29.988281-12.402343s21.722656 4.136718 29.988282 12.402343l8.769531 8.769531 63.625-63.65625-8.753907-8.753906c-25.007812-25.007812-58.257812-38.78125-93.628906-38.78125-35.367187 0-68.621094 13.773438-93.628906 38.78125-25.007812 25.011719-38.78125 58.261719-38.78125 93.628906 0 35.367188 13.773438 68.621094 38.78125 93.628907 25.007812 25.007812 58.261719 38.78125 93.628906 38.78125 35.367188 0 68.617188-13.769531 93.625-38.777344 0 0 93.582032-93.625 93.582032-93.625s29.894531-29.910156 29.894531-29.910156l.085937-.085938c16.539063-16.535156 43.445313-16.535156 59.980469 0 8.011719 8.007813 12.421875 18.660157 12.421875 29.988281 0 11.328126-4.410156 21.980469-12.421875 29.988282-16.535156 16.535156-43.441406 16.535156-59.980469 0l-8.769531-8.769532-63.625 63.65625 8.757813 8.753907c25.007812 25.007812 58.257812 38.78125 93.625 38.78125 35.367187 0 68.621093-13.773438 93.628906-38.78125 25.011718-25.007813 38.785156-58.261719 38.785156-93.628907 0-35.367187-13.773438-68.617187-38.78125-93.628906zm0 0" /><path d="m264.765625 141.160156 66.199219-66.195312-74.964844-74.964844-74.964844 74.964844 74.945313 74.941406s8.765625-8.769531 8.785156-8.746094zm0 0" /><path d="m247.234375 370.796875-66.199219 66.195313 74.964844 74.960937 74.964844-74.960937-74.945313-74.945313s-8.765625 8.769531-8.785156 8.75zm0 0" /></svg>
                            </div>
                        </div>
                        <NavLink
                            exact
                            style={{ padding: 10, color: "white", textDecoration: "none" }}
                            activeStyle={{ fontWeight: "bold", color: "red" }}
                            key="/"
                            to="/"><div class={styles.sign}>
                                <span class={styles.fastflicker}>S</span>upe<span class={styles.flicker}>r</span>
                                <span class={styles.fastflicker}>S</span>ho<span class={styles.flicker}>pp</span>er
                              </div></NavLink>
                        <AutoComplete
                            value={value}
                            options={products.map(item => item.name)
                                .filter((value, index, self) => self.indexOf(value) === index).map((item) => ({ value: item }))}
                            filterOption={(inputValue, option) =>
                                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                            dropdownMatchSelectWidth={600}
                            style={{
                                width: 600,
                                marginLeft: "500px",
                                background: "black"
                            }}
                            onSelect={onSelect}
                            onSearch={onSearch}
                            onChange={onChange}

                        >
                            <Input.Search size="large" placeholder="input here" enterButton onSearch={onSearch} />
                        </AutoComplete>

                        <Location ></Location>

                        {isAuth &&
                            <div style={{ width: "22%", right: "0", position: "absolute", marginRight: "15px", height: "40px", display: "flex", justifyContent: "space-between" }}>
                                <Button style={{ color: "white", maxWidth: "150px", height: "max-content", marginTop: "-10px" }} onClick={handleClickOrders}>Returns & Orders</Button>
                                <IconButton aria-label="show cart" color="inherit" onClick={showDrawer2}>
                                    <Badge badgeContent={cart.length} color="secondary">
                                        <ShoppingCartIcon style={{ fontSize: 40 }} /></Badge>
                                </IconButton>
                                <Dropdown overlay={menu} >
                                    <a className="ant-dropdown-link"
                                        onClick={e => e.preventDefault()}
                                        style={{ padding: "5px", color: "white", width: "max-content", fontSize: "larger" }}>
                                        Hi, {userData.name} <DownOutlined />
                                    </a>
                                </Dropdown>
                            </div>
                        }

                        {!isAuth &&
                            <div style={{ width: "18%", right: "0", position: "absolute", marginRight: "15px", height: "40px", display: "flex", justifyContent: "space-around" }}>
                                <IconButton aria-label="show cart" color="inherit" style={{ marginLeft: "-80px" }} onClick={showDrawer2}>
                                    <Badge badgeContent={cart.length} color="secondary">
                                        <ShoppingCartIcon style={{ fontSize: 40 }} /></Badge>
                                </IconButton>
                                <Button style={{ color: "white", marginLeft: "140px" }} onClick={() => setOpen(true)}>Sign In</Button>
                                <Button style={{ color: "white" }} onClick={() => setOpen2(true)}>Register</Button>
                            </div>
                        }



                    </Toolbar>
                    <Modal className={classes.paper}
                        open={open}
                        onClose={handleCancel}
                    >
                        <Login1
                            handleSubmit={handleSubmit}
                            error={error}
                        />
                    </Modal>
                    <Modal className={classes.paper}
                        open={open2}
                        onClose={handleCancel2}
                    >
                        <Register1
                            handleSubmit={handleSubmit2}
                            error={error}
                        />
                    </Modal>
                </AppBar>

            </div>
            <div className={classes.root}>
                {userType == "user" && <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={showDrawer}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit">
                            USER</Typography>
                        <NavLink
                            exact
                            style={{ padding: 10, color: "white", textDecoration: "none" }}
                            activeStyle={{ fontWeight: "bold", color: "red" }}
                            key="/products"
                            to="/products"><Typography variant="h6" color="inherit">
                                Products</Typography></NavLink>
                    </Toolbar>
                </AppBar>}
                {userType == "admin" && <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={showDrawer}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit">
                            ADMIN</Typography>

                        <NavLink
                            exact
                            style={{ padding: 10, color: "white", textDecoration: "none" }}
                            activeStyle={{ fontWeight: "bold", color: "red" }}
                            key="/products"
                            to="/products"><Typography variant="h6" color="inherit">
                                Products</Typography></NavLink>
                        <NavLink
                            exact
                            style={{ padding: 10, color: "white", textDecoration: "none" }}
                            activeStyle={{ fontWeight: "bold", color: "red" }}
                            key="/addProduct"
                            to="/addProduct"><Typography variant="h6" color="inherit">
                                Add Product</Typography></NavLink>
                        <NavLink
                            exact
                            style={{ padding: 10, color: "white", textDecoration: "none" }}
                            activeStyle={{ fontWeight: "bold", color: "red" }}
                            key="/allOrders"
                            to="/allOrders"><Typography variant="h6" color="inherit">
                                Orders</Typography></NavLink>

                    </Toolbar>
                </AppBar>}
                <Drawer
                    title="Multi-level drawer"
                    placement="left"
                    width={520}
                    onClose={onClose}
                    visible={visible}
                >
                    Account
                    </Drawer>
                <CartDrawer
                    onClose={onClose2}
                    visible={visible2}
                    setvis={setVisible2}></CartDrawer>

            </div>

        </div>
    );
}

export { Navbar }


