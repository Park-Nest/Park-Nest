import React, { useState } from "react";
import reactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from '../pages/profile.jsx';
import { GlobalProvider } from "../context/GlobalState.js";


const router = createBrowserRouter([
    {
        path: "/profile",
        element: <Profile />
    },
    {
        path: '/'
    },
    {
        path: '/login'
    },
    {
        path: '/signup'
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
        path: '/existing-listing'
    }
])

reactDOM.createRoot(document.getElementById("root")).render(
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
);
