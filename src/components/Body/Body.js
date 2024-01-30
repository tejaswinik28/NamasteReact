import React from "react";
import ReactDOM from "react-dom/client";
import logo from '../../../logo.png';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Toolbar } from "@mui/material";
import Typography from '@mui/material/Typography';
import ResturantCard from '../RestaurantCard/RestaurantCard.js';
import Shimmer from '../Shimmer.js';
import ResList from '../../utils/mockData.js'
import { useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import './body.css';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';


const Body = () => {

    let [resList, setResList] = useState([]);
    let [searchList, setSearchList] = useState([]);
    let [searchText, setSearchText] = useState("");
    let [collectionValue, setcollectionValue] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    let val = "10";

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    console.log("Body rendered");

    useEffect(() => {
        window.addEventListener('scroll', infiniteScroll);
        fetchData();

    }, []);

    const fetchData = async () => {

        const response = await fetch('https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');

        const json = await response.json();
        const data = json.data;
        setResList(prevItems => [...prevItems, ...data.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants]);
        setSearchList(prevItems => [...prevItems, ...data.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants]);
        console.log(resList);
        console.log(searchList);
        //setItems(prevItems => [...prevItems, ...data.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants]);




        // setSearchList(json.data.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);


    };

    const infiniteScroll = async () => {
        let newPage = "";
        if ((window.innerHeight + document.documentElement.scrollTop) === document.documentElement.offsetHeight) {

            const update = {
                'filters': {},
                'lat': '12.9715987',
                'lng': '77.5945627',
                'nextOffset': "COVCELQ4KIDQ6JTJk4HbMjCnEzgE",
                'page_type': 'DESKTOP_WEB_LISTING',
                'seoParams': {
                    'apiName': 'FoodHomePage',
                    'pageType': 'FOOD_HOMEPAGE',
                    'seoUrl': 'https://www.swiggy.com/',
                },
                'widgetOffset': {
                    'NewListingView_category_bar_chicletranking_TwoRows': "",
                    'NewListingView_category_bar_chicletranking_TwoRows_Rendition': "",
                    'Restaurant_Group_WebView_PB_Theme': "",
                    'Restaurant_Group_WebView_SEO_PB_Theme': "",
                    'collectionV5RestaurantListWidget_SimRestoRelevance_food_seo': `${val}`,
                    'inlineFacetFilter': "",
                    'restaurantCountWidget': "",
                },
                '_csrf': "HR4ymCmN9tSi-6ddbDD8GsKgKM7-xZdIwb8vG3_8"

            }
            const rawResponse = await fetch('https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/update', {
                method: 'POST',
                headers: {

                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(update)
            });

            const content = await rawResponse.json();

            val = content?.data?.pageOffset?.widgetOffset?.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo;
            setcollectionValue("90");
            console.log(collectionValue);
            console.log(content?.data?.pageOffset?.widgetOffset?.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo);
            setSearchList(prevItems => [...prevItems, ...content?.data.cards[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants]);
        }

    };


    return resList.length === 0 ? <Shimmer /> : (

        <Container maxWidth="lg" className="body">
            {<div className="filter">
                <Paper elevation={3}
                    component="form"
                    className="search-bar"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 500 }}
                >

                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search"
                        value={searchText}
                        onChange={(e) => {
                            setSeachText(e.target.value);
                        }}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search"
                        onClick={() => {
                            //setSearchList(resList);
                            const filteredList = resList.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()));
                            setSearchList(filteredList);
                        }}
                    >
                        <SearchIcon />
                    </IconButton>

                </Paper>

                {/*  Top Rated restaurant
                 <button className="fliter-btn" onClick={() => {

                    let filterList = resList.filter(
                        (res) => res.avgRating > 4
                    );
                    setResList(filterList);
                }}>Top Rated Restaurant</button> */}
            </div>}


            {/* <div className="restro-container"> */}
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {searchList.map((restaurant) => (
                    <Grid item xs={2} sm={4} md={4} key={restaurant.info.id}>
                        <Link to={"/restaurants/" + restaurant.info.id}  >
                            <Item><ResturantCard resData={restaurant}></ResturantCard></Item>
                        </Link>
                    </Grid>

                ))}
            </Grid>
            {/* </div> */}
        </Container >


    )
}

export default Body;