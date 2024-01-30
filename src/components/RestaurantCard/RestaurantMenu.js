import React from "react";
import ReactDOM from "react-dom/client";
import { useEffect, useState } from "react";
import Shimmer from '../Shimmer.js';
import Container from '@mui/material/Container';
import './restaurantMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faPersonBiking } from '@fortawesome/free-solid-svg-icons'
import { useParams } from "react-router-dom";
import { MENU_API_URL } from "../../utils/constants.js";
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RestaurantMenuList from "./restaurantMenuList.js";
import RestaurantMenuDetail from "./RestaurantMenuDetail.js";


const RestaurantMenu = () => {
    //const { name, cuisines, areaName, locality } = undefined || {};
    const { resId } = useParams();
    const [checked, setChecked] = React.useState(true);
    const StartElement = <FontAwesomeIcon icon={faStar} size="xl" style={{ color: "#059907", }} />
    const CycleElement = <FontAwesomeIcon icon={faPersonBiking} style={{ color: "#9da0a4", }} />
    const [resInfo, setResInfo] = useState(null);
    const [resMenu, setResMenu] = useState(null);
    useEffect(() => {
        fetchMenu();
    }, [checked]);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const fetchMenu = async () => {
        const data = await fetch(MENU_API_URL + resId);
        const json = await data.json();
        setResInfo(json.data);
        let resMenu = json.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards;
        resMenu.shift();
        setResMenu(resMenu);
        console.log("Full data set", json.data.cards[2].groupedCard.cardGroupMap.REGULAR);
        console.log('shift', resMenu);
        console.log(json.data.cards[0].card.card.info);


        //  setResInfo(json.data);
    };


    const { name, cuisines, areaName, locality, feeDetails, avgRatingString, totalRatingsString } = resInfo?.cards[0]?.card?.card?.info ?? {};



    return resInfo == null ?
        (<Shimmer />)
        :
        (
            <Container maxWidth="lg" className="menu">

                <div className="resHeader_Container">
                    <div className="resHeader_wrapper">
                        <div className="resNameAddress_wrapper">
                            <div>
                                <p className="resNameAddress_name">{name}</p>
                                <p className="resNameAddress_cuisines">{cuisines.join(',')}</p>
                            </div>
                            <div className="resNameAddress_address">
                                {areaName}, {locality}
                            </div>
                        </div>
                        <button className="resRatingWrapper">
                            <span className="resRatingWrapper_avgRating">
                                <span className="resRatingWrapper_avgRating_icon">{StartElement}</span>
                                <span>{avgRatingString}</span>
                            </span>

                            <span className="resRatingWrapper_totalRating">{totalRatingsString}</span>
                        </button>

                        <div className="resMessage_Wrapper">
                            <span>{CycleElement}</span>
                            <span className="resMessage_text">{feeDetails.message}</span>

                        </div>


                    </div>
                    <hr className="resHeader_dottedSeparator"></hr>
                    <div className="resDeliveryDetails_wrapper">

                        <FormControlLabel
                            value="VegOnly"
                            control={<Switch
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />}
                            label="Veg Only"
                            labelPlacement="start"
                        />





                        {resMenu.map((item) => (

                            <RestaurantMenuDetail resMenuList={item} vegOnly={checked}></RestaurantMenuDetail>

                        ))}
                    </div>
                </div>


            </Container >
        )
}

export default RestaurantMenu;