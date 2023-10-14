import React from "react";
import '../styles/navbar.css';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('/home/logout', {
        method: 'GET',
        credentials: 'include', // Include cookies in the request
      });

      if (response.status === 200) {
        // Redirect the user to the desired page (e.g., the login page or home page)
        navigate('/');
      } else {
        // Handle the case when the logout request fails
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };


  return (
    <nav className='navbar' >
      <a href="/search" className="logo">PARK NEST</a>
      <ul className="navLinks">
        <a href="/profile">PROFILE</a>
        <a onClick={handleLogout}>LOGOUT</a>
      </ul>
    </nav>
  );
}

export default Navbar;