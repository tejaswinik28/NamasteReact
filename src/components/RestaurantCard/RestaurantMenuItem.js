import React from "react";
import ReactDOM from "react-dom/client";
import "./restaurantMenuItem.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const RestaurantMenuItem = (props) => {

    const { menuItem } = props;
    return (
        <div key={menuItem.card.info.id}>
            <div className="resMenuItem_wrapper">
                <div className="resMenuItemName_wrapper">

                    <span className="resMenuItem_category"><FontAwesomeIcon icon={faSeedling} style={{ color: "#19702f", }} /></span>
                    <div className="resMenuItem_title"> {menuItem.card.info.name}</div>
                    <div className="resMenuItem_price">${menuItem.card.info.price / 100}</div>
                </div>
                <div className="resMenuItem_image">
                    <img className="resMenuItem_imageDetail" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" + menuItem.card.info.imageId}></img>
                </div>
            </div>


            <div className="styles_divider__1BqVH"></div>
        </div>
    );
};
export default RestaurantMenuItem;