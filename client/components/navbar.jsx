import React from "react";
import '../styles/navbar.css';

const Navbar = () => {
  return (
    <nav className='navbar' >
        <a href="/search" className="logo">PARK NEST</a>
        <ul className="navLinks">
          <a href="/profile">PROFILE</a>
          <a href="/">LOGOUT</a>
        </ul>
    </nav>
  )
}

export default Navbar;