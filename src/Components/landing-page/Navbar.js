import React,{useState, useEffect} from 'react';
import{Link} from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <>
    <nav className='navbar'>
        <div className='logo-container'>
            <img src="./img/LOGO.svg" alt="logo"/>
        </div>
    </nav>
    </>
  )
}

export default Navbar