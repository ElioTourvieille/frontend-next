"use client";

import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import logo from "../public/img/Logo.png";
import Link from "next/link";

export default function NavbarActionButton() {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["solutions", "feature", "faq"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="relative z-20 w-full border-b-2 shadow-lg border-gray-600 bg-gray-900 shadow-gray-700/5 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:backdrop-blur-sm lg:after:hidden">
        <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
          <nav
            aria-label="main navigation"
            className="flex h-[5.5rem] justify-between font-medium text-gray-200"
            role="navigation"
          >
            {/*  <!-- Brand logo --> */}
            <span
              id="Poker ProGrid"
              aria-label="Poker ProGrid logo"
              aria-current="page"
              className="flex items-center gap-2 py-3"
            >
              <Link
                href="/"
                className="flex items-center gap-4 py-3 text-lg whitespace-nowrap focus:outline-none lg:flex-1"
              >
                <Image src={logo}
                 alt="Poker ProGrid"
                  width={60} height={60}
                  className="w-auto h-auto shadow-2xl shadow-black lg:w-[60px] lg:h-[60px]"
                  />
                <h2 className="text-2xl font-orbitron font-extrabold bg-gradient-to-r from-white to-blue-500 text-transparent bg-clip-text">
                  Poker ProGrid
                </h2>
              </Link>
            </span>
            {/*      <!-- Mobile trigger --> */}
            <button
              className={`relative order-10 block h-10 w-10 self-center lg:hidden
              ${
                isToggleOpen
                  ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 "
                  : ""
              }
            `}
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              aria-expanded={isToggleOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <div className="absolute w-6 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
              </div>
            </button>
            {/*      <!-- Navigation links --> */}
            <div className="flex items-center gap-4 px-6 ml-auto lg:ml-0 lg:p-0">
              <ul
                role="menubar"
                aria-label="Select page"
                className={`absolute left-0 top-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden  overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${
                  isToggleOpen
                    ? "visible opacity-100 backdrop-blur-sm"
                    : "invisible opacity-0"
                }`}
              >
                <li role="none" className="flex items-stretch">
                  <a
                    role="menuitem"
                    aria-current={
                      activeSection === "solutions" ? "page" : undefined
                    }
                    className={`flex items-center gap-2 py-4 transition-colors duration-300 ${
                      activeSection === "solutions"
                        ? "text-blue-600"
                        : "hover:text-blue-500"
                    } focus:text-blue-600 focus:outline-none focus-visible:outline-none lg:px-8`}
                    href="#solutions"
                  >
                    <span>Solutions</span>
                  </a>
                </li>
                <li role="none" className="flex items-stretch">
                  <a
                    role="menuitem"
                    aria-current={
                      activeSection === "feature" ? "page" : undefined
                    }
                    className={`flex items-center gap-2 py-4 transition-colors duration-300 ${
                      activeSection === "feature"
                        ? "text-blue-600"
                        : "hover:text-blue-500"
                    } focus:text-blue-600 focus:outline-none focus-visible:outline-none lg:px-8`}
                    href="#feature"
                  >
                    <span>Fonctionnalités</span>
                  </a>
                </li>
                <li role="none" className="flex items-stretch">
                  <a
                    role="menuitem"
                    aria-current={activeSection === "faq" ? "page" : undefined}
                    aria-haspopup="false"
                    className={`flex items-center gap-2 py-4 transition-colors duration-300 ${
                      activeSection === "faq"
                        ? "text-blue-600"
                        : "hover:text-blue-500"
                    } lg:px-8`}
                    href="#faq"
                  >
                    <span>FAQ</span>
                  </a>
                </li>
              </ul>
              <div className="flex items-center gap-4 px-6 ml-auto lg:ml-0 lg:p-0">
                <LoginLink>
                  <Button variant="elevated">Connexion</Button>
                </LoginLink>

                <RegisterLink>
                  <Button variant="secondary">Inscription</Button>
                </RegisterLink>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
