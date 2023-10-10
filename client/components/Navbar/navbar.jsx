import React from "react";
import '../Navbar/navbar.css'

const Navbar = () => {
  return (
    <navbar className='navbar' >
        <a href="/" className="logo">PARK NEST</a>
        <ul className="navLinks">
          <a href="/profile">PROFILE</a>
          <a href="/">LOGOUT</a>
        </ul>
    </navbar>
  )
}

export default Navbar;