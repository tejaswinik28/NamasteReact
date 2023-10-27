import React from "react";
import ReactDOM from "react-dom/client";
import logo from '../logo.png';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Toolbar } from "@mui/material";
import Typography from '@mui/material/Typography';
import { Header } from './components/Header'
import Body from './components/Body'


const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];


const AppLayout = () => {
    return (
        <div className="app">
            <Header />
            <Body />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);