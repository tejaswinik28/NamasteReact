import React from "react";
import ReactDOM from "react-dom/client";
import logo from '../../logo.png';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Toolbar } from "@mui/material";
import Typography from '@mui/material/Typography';
import ResturantCard from './RestaurantCard';
import Shimmer from './Shimmer.js';
import ResList from '../utils/mockData'
import { useState, useEffect } from "react";



const Body = () => {

    let [resList, setResList] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await data.json();
        setResList(json.data.cards[2].card.card.gridElements.infoWithStyle.restaurants);
    };

    if (resList.length === 0) {
        return (
            <Shimmer />
        );
    }

    return (

        <Container maxWidth="lg" className="body">
            {/* <div className="filter">
                <button className="fliter-btn" onClick={() => {

                    let filterList = resList.filter(
                        (res) => res.avgRating > 4
                    );
                    setResList(filterList);
                }}>Top Rated Restaurant</button>
            </div> */}


            <div className="restro-container">
                {resList.map((restaurant) => (
                    <ResturantCard key={restaurant} resData={restaurant}></ResturantCard>
                ))}
            </div>
        </Container >


    )
}

export default Body;