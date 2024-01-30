import React from "react";
import ReactDOM from "react-dom/client";

const RestaurantMenuList = (resMenuList) => {
    return (
        resMenuList.resMenuList.card.card['@type'] == 'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory' ?
            <div>
                <h3>{resMenuList.resMenuList.card.card.title}</h3>

                {resMenuList.resMenuList.card.card.itemCards.map((menuItem) => (
                    resMenuList.vegOnly == true && menuItem.card.info.itemAttribute.vegClassifier == 'VEG' ?
                        <div>{menuItem.card.info.name}</div>
                        : resMenuList.vegOnly == false ?
                            <div>{menuItem.card.info.name}</div>
                            :
                            <div></div>
                ))}

                <hr className="resHeader_dottedSeparator"></hr>
            </div>
            : (resMenuList.resMenuList.card.card['@type'] == 'type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory' ?
                <div>
                    <h3>{resMenuList.resMenuList.card.card.title}</h3>

                    {resMenuList.resMenuList.card.card.categories.map((menuItem) => (
                        menuItem.itemCards.map((dishes) => (
                            resMenuList.vegOnly == true && dishes.card.info.itemAttribute.vegClassifier == 'VEG' ?
                                <div> {dishes.card.info.name} </div>
                                : resMenuList.vegOnly == false ? <div> {dishes.card.info.name} </div>
                                    :
                                    <div></div>
                        ))

                    ))}

                    <hr className="resHeader_dottedSeparator"></hr>
                </div>
                :
                <div></div>)
    )

};

export default RestaurantMenuList;