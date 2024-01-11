import React from "react";
import ReactDOM from "react-dom/client";
import logo from '../logo.png';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Toolbar } from "@mui/material";
import Typography from '@mui/material/Typography';
import { Header } from './components/Header'
import Body from './components/Body';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];


const AppLayout = () => {
    return (
        <div className="app">
            <Header />
            <Outlet />
        </div>
    );
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Body />
            },
            {
                path: "/about",
                element: <About />,

            },
            {
                path: "contact",
                element: <Contact />,
            }
        ],
        errorElement: <Error />
    },

]);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);