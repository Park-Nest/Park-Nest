import React, { useState } from "react";
import reactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GlobalProvider } from "../context/GlobalState.js";
import Profile from '../pages/profile.jsx';
import Signup from "../pages/signup.jsx";
import Login from "../pages/login.jsx";
import ExistingListing from "../pages/existingListings.jsx";
import EditListing from "../pages/editListing.jsx";

const router = createBrowserRouter([
    {
        path: "/profile",
        element: <Profile />
    },
    {
        path: '/'
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
        path: '/homepage'
    },
    {
        path: '/listing-booking'
    },
    {
        path: '/listing-creation'
    },
    {
        path: '/confirmed-booking'
    },
    {
        path: '/existing-listing',
        element: <ExistingListing />
    },
    {
        path: '/edit-listing',
        element: <EditListing />
    }
])

reactDOM.createRoot(document.getElementById("root")).render(
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
);
