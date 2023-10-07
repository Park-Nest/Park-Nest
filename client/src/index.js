import React from "react";
import reactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from '../pages/profile.jsx';


const router = createBrowserRouter([
    {
        path: "/profile",
        element: <Profile />
    }
])

reactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);