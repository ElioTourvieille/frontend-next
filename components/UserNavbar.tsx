"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "../public/img/Logo.png";
import Avatar from "./avatar";
import Link from "next/link";

export default function UserNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-20 w-full border-b-2 shadow-lg border-gray-600 bg-gray-900 shadow-gray-700/5 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:backdrop-blur-sm lg:after:hidden">
        <div className="relative mx-auto max-w-full px-4 lg:px-6 lg:max-w-6xl xl:max-w-9xl 2xl:max-w-[110rem]">
          <nav className="flex items-center justify-between py-4 lg:py-6">
            {/* Brand logo */}
            <span className="flex items-center">
              <a href="/user" className="flex items-center gap-2">
                <Image
                  src={logo}
                  alt="Poker ProGrid"
                  width={40}
                  height={40}
                  className="shadow-2xl shadow-black lg:w-[50px] lg:h-[50px]"
                />
                <h2 className="text-lg lg:text-xl font-orbitron font-extrabold bg-gradient-to-r from-white to-blue-500 text-transparent bg-clip-text">
                  Poker ProGrid
                </h2>
              </a>
            </span>

            {/* Navigation links */}
            <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:block absolute lg:relative top-full left-0 w-full lg:w-auto bg-gray-900 lg:bg-transparent`}>
              <ul className="flex flex-col lg:flex-row items-center gap-2 py-4 lg:py-0">
                <li className="w-full lg:w-auto">
                  <Link
                    role="menuitem"
                    aria-current={pathname === "/user/tournaments" ? "page" : undefined}
                    className={`block w-full px-4 py-2 lg:px-8 lg:py-4 text-center transition-colors duration-300 ${
                      pathname === "/user/tournaments" ? "text-blue-600" : "text-gray-200 hover:text-blue-500"
                    }`}
                    href="/user/tournaments"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Tournois
                  </Link>
                </li>
                <li className="w-full lg:w-auto">
                  <Link
                    role="menuitem"
                    aria-current={pathname === "/user/grids" ? "page" : undefined}
                    className={`block w-full px-4 py-2 lg:px-8 lg:py-4 text-center transition-colors duration-300 ${
                      pathname === "/user/grids" ? "text-blue-600" : "text-gray-200 hover:text-blue-500"
                    }`}
                    href="/user/grids"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Mes Tableaux
                  </Link>
                </li>
                <li className="w-full lg:w-auto">
                  <Link
                    role="menuitem"
                    aria-current={pathname === "/user/subscription" ? "page" : undefined}
                    className={`block w-full px-4 py-2 lg:px-8 lg:py-4 text-center transition-colors duration-300 ${
                      pathname === "/user/subscription" ? "text-blue-600" : "text-gray-200 hover:text-blue-500"
                    }`}
                    href="/user/subscription"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Abonnements
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Avatar and burger button group */}
            <div className="flex items-center gap-2">
              {/* Burger button */}
              <button
                className="lg:hidden text-white p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
              <Avatar />
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
