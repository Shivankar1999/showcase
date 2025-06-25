'use client'
import React, { useState } from 'react';
import { useAppSelector } from '../store/hooks';
export  const Header = () => {
    // State to manage the visibility of the mobile menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const  {cart} = useAppSelector(state => state);
    console.log(cart.items.length,'cart');
    
    // Function to toggle the mobile menu visibility
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    return (
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg rounded-b-xl">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Brand/Logo Section */}
          <div className="flex items-center">
            <a href="#" className="text-3xl font-extrabold tracking-tight rounded-md p-1 transform transition-transform duration-200 hover:scale-105">
              MyBrand
            </a>
          </div>
  
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-6">
            <NavLink href="/" text="Products" />
            <NavLink href="/cart" text="Cart" cartValue = {cart.items.length > 0 ? cart.items.length : ''} /> 
         
 
           
          </nav>
  
          {/* Mobile Menu Button (Hamburger Icon) */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white transition duration-300 ease-in-out"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                // Close Icon (X)
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                // Hamburger Icon
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
  
        {/* Mobile Navigation Menu (hidden by default, shown when isMenuOpen is true) */}
        <nav
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-screen opacity-100 py-2' : 'max-h-0 opacity-0'
          } bg-blue-700 rounded-b-xl`}
        >
          <div className="flex flex-col items-center space-y-3 px-4 pb-4 pt-2">
            <NavLink href="/" text="Prodcuts" isMobile={true} />
            <NavLink href="/cart" text="Cart" isMobile={true} />

          </div>
        </nav>
      </header>
    );
  };
  
  // Helper component for navigation links
  const NavLink = ({ href, text,cartValue , isMobile = false }:any) => (
    <a
      href={href}
      className={`
        font-medium
        rounded-md
        px-3
        py-2
        transition
        duration-300
        ease-in-out
        hover:bg-white
        hover:text-blue-600
        ${isMobile ? 'text-lg w-full text-center' : 'text-base'}
      `}
    >
      {text} {cartValue && <span className='text-red'>{cartValue}</span>}
    </a>
  );