import React from "react";
import ReactDOM from "react-dom/client";
import { useEffect, useState } from "react";
import Shimmer from '../Shimmer.js';
import Container from '@mui/material/Container';
import './restaurantMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faPersonBiking } from '@fortawesome/free-solid-svg-icons'


const RestaurantMenu = () => {
    //const { name, cuisines, areaName, locality } = undefined || {};
    const StartElement = <FontAwesomeIcon icon={faStar} size="xl" style={{ color: "#059907", }} />
    const CycleElement = <FontAwesomeIcon icon={faPersonBiking} style={{ color: "#9da0a4", }} />
    const [resInfo, setResInfo] = useState(null);
    useEffect(() => {
        fetchMenu();
    }, []);



    const fetchMenu = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=206339&catalog_qa=undefined&submitAction=ENTER");
        const json = await data.json();
        setResInfo(json.data);
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

                    </div>
                </div>


            </Container>
        )
}

export default RestaurantMenu;