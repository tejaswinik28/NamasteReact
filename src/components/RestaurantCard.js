import React from "react";
import ReactDOM from "react-dom/client";
import logo from '../../logo.png';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Toolbar } from "@mui/material";
import Typography from '@mui/material/Typography';
//Named exports are imported with {}
import { CDN_URL } from '../utils/constants';

const ResturantCard = (props) => {
    const { resData } = props;

    const { cloudinaryImageId, name, avgRating, cuisines, costForTwo, deliveryTime, id } = resData.info;


    return (
        <div className="res-card">

            <img className="res-logo" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" + cloudinaryImageId}></img>
            <div className="res-card-title">{name}</div>
            <div className="res-card-description">{cuisines}</div>
            <div className="res-card-description">{avgRating}</div>
            <div className="res-card-description">{costForTwo}</div>

        </div>
    )

};

export default ResturantCard;