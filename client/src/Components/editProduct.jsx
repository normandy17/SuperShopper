import React, { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { updateProduct } from "../Redux/ProductsRedux/actions"


const UseStyles = makeStyles((theme) => ({
       
    paper: {
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        width: "max-content",
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),

        TextField:{
            width:"500px"
        }
    },
}));    


const EditProduct = (props) => {
    console.log(props.product)
    const dispatch = useDispatch()
    const history = useHistory()
    
    const [name, setName] = React.useState(props.product.name)
    const [brand, setBrand] = React.useState(props.product.brand)
    const [category, setCategory] = React.useState(props.product.category.join())
    const [description, setDescription] = React.useState(props.product.description)
    const [mrp, setMrp] = React.useState(props.product.mrp)
    const [mdp, setMdp] = React.useState(props.product.mdp)
    const [offer, setOffer] = React.useState(props.product.offer)
    const [availability, setAvailability] = React.useState(props.product.availability)
    const [product_rating, setProduct_rating] = React.useState(props.product.product_rating)
    const [product_specifications,setProduct_specifications] = React.useState(props.product.product_specifications)
    const [image, setImage] = React.useState(props.product.image.join())
    // const page = useSelector((state) => state.page)
    // const limit = useSelector((state) => state.limit)  
    
      
    const classes = UseStyles();

    const handleUpdate = async() => {
        console.log("object")
        const payload={
            name:name,
            brand:brand,
            category:category,
            description:description,
            mrp:mrp,
            mdp:mdp,
            offer:offer,
            availability:availability,
            product_rating:product_rating,
            product_specifications:product_specifications,
            image:image
        }
        const reply=await dispatch(updateProduct(props.product._id,payload))
        if(reply){
        console.log(payload)
        alert("Update Success")
        props.handleClose()
    }else alert("Update Failed")
    }

    const handleMrpchange=(e)=>{

    }
    const handleMdpchange=(e)=>{

    }

    return (                  
                <div >
                    <div style={{display:"flex", margin:"20px", justifyContent:"space-around"}}>
                    <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} /><br />
                    <TextField id="outlined-basic" label="Brand" variant="outlined" value={brand} onChange={(e) => setBrand(e.target.value)} /><br />
                    <TextField id="outlined-basic" label="Category" variant="outlined" value={category} onChange={(e) => setCategory(e.target.value)} /><br />
                   </div>                   
                    <TextField id="outlined-basic" style={{width:"95%", margin:"20px"}} multiline rowsMax={2} label="Description" variant="outlined" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
                    <div style={{display:"flex", margin:"20px", justifyContent:"space-around"}}>
                    <TextField id="outlined-basic" style={{width:"150px"}} label="MRP" variant="outlined" value={mrp} onChange={(e) => setMrp(e.target.value)  } /><br />
                    <TextField id="outlined-basic" style={{width:"150px"}} label="Retail Price" variant="outlined" value={mdp} onChange={(e) => setMdp(e.target.value)  } /><br />
                    <TextField id="outlined-basic" style={{width:"150px"}} InputProps={{ readOnly: true }} label="Offer" variant="outlined" value={(((mrp-mdp)/mrp)*100)} onChange={(e) => setOffer(e.target.value)}/><br />
                    <TextField id="outlined-basic" style={{width:"150px"}} label="Availability" variant="outlined" value={availability} onChange={(e) => setAvailability(e.target.value)} /><br />
                    <TextField id="outlined-basic" style={{width:"150px"}} label="Product Rating" variant="outlined" value={product_rating} onChange={(e) => setProduct_rating(e.target.value)} /><br />
                    </div>
                    <TextField id="outlined-basic" style={{width:"95%", margin:"20px"}} multiline rowsMax={2} label="Product Specifications" variant="outlined" value={product_specifications} onChange={(e) => setProduct_specifications(e.target.value)} /><br />
                    <TextField id="outlined-basic" style={{width:"95%", margin:"20px"}} multiline rowsMax={2} label="Image" variant="outlined" value={image} onChange={(e) => setImage(e.target.value)} /><br />
                   
                    <Button variant="outlined" color="primary" onClick={handleUpdate}>UPDATE</Button>
                </div>
                   
    )
}


export default EditProduct