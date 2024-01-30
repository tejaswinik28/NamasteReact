import React from "react";
import ReactDOM from "react-dom/client";
import "./restaurantMenuDetail.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RestaurantMenuItem from './RestaurantMenuItem.js';


const RestaurantMenuDetail = (resMenuList) => {
    return (
        resMenuList.resMenuList.card.card['@type'] == 'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory' ?
            <div>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <div className="menuDetail_header">{resMenuList.resMenuList.card.card.title}</div>
                    </AccordionSummary>
                    <AccordionDetails>
                        {resMenuList.resMenuList.card.card.itemCards.map((menuItem) => (
                            resMenuList.vegOnly == true && menuItem.card.info.itemAttribute.vegClassifier == 'VEG' ?

                                <RestaurantMenuItem menuItem={menuItem}></RestaurantMenuItem>

                                : resMenuList.vegOnly == false ?

                                    <RestaurantMenuItem menuItem={menuItem}></RestaurantMenuItem>
                                    :
                                    <div></div>
                        ))}
                    </AccordionDetails>
                </Accordion>

            </div>
            : (resMenuList.resMenuList.card.card['@type'] == 'type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory' ?
                <div>


                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <div className="menuDetail_header">{resMenuList.resMenuList.card.card.title}</div>
                        </AccordionSummary>
                        <AccordionDetails>

                            {resMenuList.resMenuList.card.card.categories.map((menuItem) => (
                                menuItem.itemCards.map((dishes) => (
                                    resMenuList.vegOnly == true && dishes.card.info.itemAttribute.vegClassifier == 'VEG' ?

                                        <RestaurantMenuItem menuItem={dishes}></RestaurantMenuItem>

                                        : resMenuList.vegOnly == false ?

                                            <RestaurantMenuItem menuItem={dishes}></RestaurantMenuItem>

                                            :
                                            <div></div>
                                ))

                            ))}

                        </AccordionDetails>
                    </Accordion>

                </div>
                :
                <div></div>)
    )
};

export default RestaurantMenuDetail;