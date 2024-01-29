import { useRouteError } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import Container from '@mui/material/Container';

const Error = () => {
    const err = useRouteError();

    return (
        <Container maxWidth="lg" className="body">
            <div>
                <h1>Error Page 👻</h1>
                <h3>{err.status} : {err.statusText}</h3>

            </div>
        </Container>
    )
};

export default Error;