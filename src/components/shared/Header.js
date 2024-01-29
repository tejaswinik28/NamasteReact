import React from "react";
import ReactDOM from "react-dom/client";
import logo from '../../../logo2.png';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Toolbar } from "@mui/material";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.css";

export const Header = (props) => {

    const drawerWidth = 240;
    const [loginBtn, setLoginBtn] = React.useState('LOGIN');
    const navItems = [{ name: 'HOME', toLink: '/', id: 1 }, { name: 'ABOUT', toLink: '/about', id: 2 }, { name: 'CONTACT', toLink: '/contact', id: 3 }, { name: 'CART', toLink: '/cart', id: 4 }, { name: 'LOGIN', id: 5 }];

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);


    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                MUI
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.id} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;


    return (
        <div className="header">
            {/* <div className="logo-container">
                <Container maxWidth="lg">
                    <Toolbar>
                        <img className="logo" src={logo}></img>
                    </Toolbar>
                </Container>

            </div>
            <div className="nav-items">
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact US</li>
                    <li>Cart</li>
                </ul>
            </div> */}




            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} >

                        <Container maxWidth="lg">
                            <Toolbar>
                                <img className="logo" src={logo}></img>
                            </Toolbar>
                        </Container>

                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }} className="header-navitems">
                        {navItems.map((item) => {

                            if (item.name === 'LOGIN') {
                                console.log(loginBtn);
                                return (
                                    <Button size="large" key={item.id} sx={{ color: '#000000' }} onClick={() => {
                                        setLoginBtn("Logout");
                                    }}>
                                        <b>{loginBtn}</b>
                                    </Button>
                                )
                            }
                            else {
                                return (
                                    <Link size="large" to={item.toLink} sx={{ color: '#000000' }}>
                                        <b>{item.name}</b>
                                    </Link>)
                            }


                        })}
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>



        </div>
    )
};

export default Header;

