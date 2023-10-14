import React, { useState } from "react";
import reactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from '../pages/profile.jsx';
import Landing from '../pages/landingpage.jsx';
import ListingBooking from "../pages/ListingBooking.jsx";
import { GlobalProvider } from "../context/GlobalState.js";
import Signup from "../pages/signup.jsx";
import Login from "../pages/login.jsx";
import Confirmedbooking from "../pages/confirmedbooking.jsx"
import '../styles/styles.css';
import '../styles/footer.css';
import '../styles/navbar.css';
import ListingCreationPage from "../pages/ListingCreationPage.jsx";
import ExistingListing from "../pages/existingListings.jsx";
import EditListing from "../pages/editListing.jsx";
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
        path: '/signup',
        element: <Signup />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/listing-booking',
        element: <ListingBooking />
    },
    {
        path: '/homepage',
        element: <Homepage />
    },
    {
        path: '/listing-creation',
        element: <ListingCreationPage />        
    },
    {
        path: '/confirmed-booking',
        element: <Confirmedbooking />
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
