"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import logo from "@/app/assets/logo.png";
import { usePathname } from 'next/navigation';
import { CardContext } from '@/context/CardContext';

const Navbar = () => {
  const pathname = usePathname();
  const cardContext = useContext(CardContext);
  if (!cardContext) {
    throw new Error('Navbar must be used within CardProvider.');
  }
  const { PlanCards, Saved } = cardContext;

  // Active link styles
  const activeClass = "bg-[#1A2312] text-[#C2F800] rounded-3xl font-medium px-4 py-2";
  // Inactive link styles
  const inactiveClass = "bg-transparent text-gray-300 hover:text-white px-4 py-2";

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li><Link href="/">Workouts</Link></li>
            <li><Link href="/Plan">My Plan</Link></li>
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <Image src={logo} alt="Logo" width={40} height={40} />
          <Link href="/" className="btn btn-ghost text-xl">FITLOG</Link>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">     
          <li>
            <Link 
              href="/" 
              className={pathname === '/' ? activeClass : inactiveClass}
            >
              Workouts
            </Link>
          </li>
          <li>
            <Link 
              href="/Plan" 
              className={pathname === '/Plan' ? activeClass : inactiveClass}
            >
              My Plan
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end flex gap-4">
        <span>Plan <span className="badge bg-[#C2F800] text-black">{PlanCards.length}</span></span>
        <span>Saved <span className="badge border border-[#2D313B]">{Saved.length}</span></span>
      </div>
    </div>
  );
};

export default Navbar;