"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import React, { useEffect, useRef, useState } from "react";

export default function Avatar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  
  const {user} = useKindeBrowserClient();
  const initials = `${user?.given_name?.charAt(0)?.toUpperCase() || ""}${user?.family_name?.charAt(0)?.toUpperCase() || ""}`;

  const navigationItems = [
    {
      linkName: "Compte",
      href: "/user/account",
    },
    {
      linkName: "Abonnement",
      href: "#",
    },
    {
      linkName: "Paramètres",
      href: "#",
    },
    {
      linkName: "Déconnexion",
      href: "#",
    },
  ];

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isOpen) {
      e.preventDefault();

      switch (e.key) {
        // KeyDown
        case "ArrowDown":
          if (currentItem === navigationItems.length - 1) {
            setCurrentItem(0);
          } else {
            if (navigationItems[currentItem + 1]?.hasOwnProperty("separator")) {
              setCurrentItem(currentItem + 2);
            } else {
              setCurrentItem(currentItem + 1);
            }
          }
          break;
        // KeyUp
        case "ArrowUp":
          if (currentItem === 0) {
            setCurrentItem(navigationItems.length - 1);
          } else {
            if (navigationItems[currentItem - 1]?.hasOwnProperty("separator")) {
              setCurrentItem(currentItem - 2);
            } else {
              setCurrentItem(currentItem - 1);
            }
          }
          break;
        // Escape
        case "Escape":
          setCurrentItem(1);
          setIsOpen(false);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) 
      {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen ? "true" : "false"}
        className="inline-flex items-center justify-center w-10 h-10 text-lg text-white border-2 border-white rounded bg-blue-500"
      >
        {initials}
      </button>
      {/*  <!-- Start Menu list --> */}
      <ul
        className={`${
          isOpen ? "flex" : "hidden"
        } absolute top-full -right-2 z-10 mt-1 w-72 list-none flex-col rounded bg-gray-900 py-2 shadow-md shadow-slate-500/10 `}
      >
        {navigationItems.map((item, index) => {
          return (
            <li key={index}>
              {item.linkName === "Déconnexion" ? (
                <LogoutLink
                  className={`${
                    index === currentItem
                      ? "bg-gray-800 text-blue-500"
                      : "bg-none text-slate-500"
                  } flex items-start justify-start gap-2 p-2 px-5 font-semibold transition-colors duration-300 hover:bg-gray-800 hover:text-blue-500 focus:text-blue-600 focus:outline-none focus-visible:outline-none`}
                >
                  <span className="flex flex-col gap-1 overflow-hidden whitespace-nowrap">
                    <span className="leading-5 truncate">{item.linkName}</span>
                  </span>
                </LogoutLink>
              ) : (
                <a
                  className={`${
                    index === currentItem
                      ? "bg-gray-800 text-blue-500"
                      : "bg-none text-slate-500"
                  } flex items-start justify-start gap-2 p-2 px-5 font-semibold transition-colors duration-300 hover:bg-gray-800 hover:text-blue-500 focus:text-blue-600 focus:outline-none focus-visible:outline-none`}
                  href={item.href}
                  aria-current={index === currentItem ? "page" : "false"}
                >
                  <span className="flex flex-col gap-1 overflow-hidden whitespace-nowrap">
                    <span className="leading-5 truncate">{item.linkName}</span>
                  </span>
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

