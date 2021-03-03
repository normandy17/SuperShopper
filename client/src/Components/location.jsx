import React, { useState } from 'react'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { fetchAllProducts } from '../Redux/ProductsRedux/actions'
import { locationRequest } from '../Redux/user/actions'
import Button from '@material-ui/core/Button';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import RoomIcon from '@material-ui/icons/Room';



const Location = () => {
    const dispatch= useDispatch()
    const [coordinate, setCoordinate] = useState({
        lat: 0,
        long: 0
    });
    let geoId;

    const location = useSelector((state) => state.auth.location)
    console.log(location)

    React.useEffect(() => {
        if((coordinate.lat>0)&&(location==null))dispatch(locationRequest(coordinate.lat,coordinate.long))
    }, [coordinate.lat])

    const getlocation = () => {
       
        geoId = window.navigator.geolocation.watchPosition(position => {
            setCoordinate({
                lat: position.coords.latitude,
                long: position.coords.longitude
            })
            
        })
       
    }

    return (
        <div style={{marginLeft:"10px", color:"white",maxWidth:"150px", height:"max-content"}}>

           { !location && <Button style={{color:"white"}} onClick={getlocation}><GpsFixedIcon/> Get Location</Button>}
            {location && <Button style={{color:"white"}}><RoomIcon/>Deliver to {location.county}, {location.postal_code}</Button>}
        </div>
    )
}


export default Location
