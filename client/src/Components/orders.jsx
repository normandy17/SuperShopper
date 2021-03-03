import React, { useState } from 'react'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useHistory } from 'react-router-dom';
import { AddtoCart, RemovefromCart } from '../Redux/ProductsRedux/actions'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Payment from './Payment';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
        margin: "5px"
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        margin: "5px"
    },
    order: {
        background: "#082436",
        color: "white",
        fontFamily: "Alex Brush",
        textTransform: "none",
        fontStretch: "100px",
        marginTop: "30px",
        width: "max-content",
        height: "max-content",
        fontSize: "40px",
        fontWeight: "600",
        "&:hover": {
            backgroundColor: 'red',

        }
    },
    empty: {
        margin: "auto",
        background: "red",
        color: "white",
        fontFamily: "Alex Brush",
        textTransform: "none",
        fontStretch: "100px",
        marginTop: "30px",
        width: "max-content",
        borderRadius: "10px",
        padding: "20px",
        height: "max-content",
        fontSize: "40px",
        fontWeight: "600"
    },
    table: {
        minWidth: 700,
    },
    return: {
        color: "white",
        background: "green",
        borderRadius: "10px",
        "&:hover": {
            backgroundColor: 'red',

        }
    }
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
        padding:"10px"
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        padding:"10px",
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);



const Orders = () => {
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.auth.userdata)
    const [expanded, setExpanded] = React.useState(false);
    const classes = useStyles();
    console.log(userData.orders[0].cart)
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    if (userData.orders.length > 0)
        return (
            <div>
                <div style={{ display: "flex" }}>
                    <Paper style={{ marginTop: "50px", width: "80%", margin: "auto" }} elevation={24} className={classes.root} >

                        {
                            userData.orders.map((item, index) => (
                                <>
                                    <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Typography className={classes.heading}>Order#: {item.billnum}</Typography>
                                            <Typography className={classes.secondaryHeading}>Placed on: {(new Date(item.date)).toLocaleTimeString(undefined, options)}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Paper style={{ marginLeft: "30px", width: "100%", textAlign: "left", padding: "20px" }} elevation={24} className={classes.root} >
                                                <div style={{display:"flex",justifyContent:"space-between", marginBottom:"30px"}}>
                                                    <div>
                                                <Typography className={classes.heading}>Order#: {item.billnum}</Typography>
                                                <Typography className={classes.heading}>Placed on: {(new Date(item.date)).toLocaleTimeString(undefined, options)}</Typography>
                                                <Typography className={classes.heading}>Expected Delivery: {(new Date(item.date + 172800000)).toLocaleTimeString(undefined, options)}</Typography>
                                                <Typography className={classes.heading}>Delivery Status: {(Date.now()) - item.date >= 172800000 ? ("Delivered") : ("En Route")}</Typography>
                                             </div> <div style={{marginRight:"20px"}}> <h1>Bill Amount: ₹{item.amount}.00</h1></div>
                                                </div>
                                               <TableContainer component={Paper}>
                                                    <Table className={classes.table} aria-label="customized table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <StyledTableCell>Product Name</StyledTableCell>
                                                                <StyledTableCell align="right">Category</StyledTableCell>
                                                                <StyledTableCell align="right">Price</StyledTableCell>
                                                                <StyledTableCell align="right">Quantity</StyledTableCell>
                                                                <StyledTableCell align="right">Total</StyledTableCell>
                                                                <StyledTableCell align="right">Return</StyledTableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {item.cart.map((row) => (
                                                                <StyledTableRow key={row.name}>
                                                                    <StyledTableCell component="th" scope="row">
                                                                        {row.name}
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="right">{row.category[0]}</StyledTableCell>
                                                                    <StyledTableCell align="right">₹ {row.mdp}.00</StyledTableCell>
                                                                    <StyledTableCell align="right">{row.quantity} Nos.</StyledTableCell>
                                                                    <StyledTableCell align="right">₹ {row.mdp * row.quantity}.00</StyledTableCell>
                                                                    <StyledTableCell align="right"><Button className={classes.return}>Return</Button></StyledTableCell>
                                                                </StyledTableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Paper>
                                        </AccordionDetails>
                                    </Accordion>

                                </>
                            ))}
                    </Paper>
                </div>
            </div>
        )

    return (
        <>
            <div className={classes.empty}>Your havent made any purchases yet!!</div>
            <Button className={classes.order}>Lets go do some Shopping!!</Button>
        </>
    )

}


export default Orders
