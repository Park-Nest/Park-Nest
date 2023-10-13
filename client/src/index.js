import React, { useState } from "react";
import reactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from '../pages/profile.jsx';
import Landing from '../pages/landingpage.jsx';
import { GlobalProvider } from "../context/GlobalState.js";
import Signup from "../pages/signup.jsx";
import Login from "../pages/login.jsx";
import Homepage from "../components/homepage.jsx";

const router = createBrowserRouter([
    {
        path: "/profile",
        element: <Profile />
    },
    {
        path: '/',
        element: <Landing />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: '/homepage',
        element: <Homepage />
    },
    {
        path: '/listing-creation'
    },
    {
        path: '/confirmed-booking'
    },
    {
        path: '/existing-listing',

    }
])

reactDOM.createRoot(document.getElementById("root")).render(
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
);
