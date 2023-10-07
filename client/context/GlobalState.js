import React, { createContext, useState } from "react";

const initialState = { 
  allListings: [],
  userBookings: [],
  userListings: []
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
  const [allListings, setAllListings] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const [userListings, setUserListings] = useState([])

  return <GlobalContext.Provider value={{allListings: allListings, setAllListings: setAllListings, userBookings: userBookings, setUserBookings: setUserBookings, userListings: userListings, setUserListings: setUserListings}}>
    {children}
  </GlobalContext.Provider>
}

