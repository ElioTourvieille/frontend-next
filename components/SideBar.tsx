"use client";

import { LogOut, MonitorCog, Package, SquareUserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useState } from "react"

export default function SideBar() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)
  const pathname = usePathname();

  return (
    <>
      {/*  <!-- Mobile trigger --> */}
      <button
        title="Side navigation"
        type="button"
        className={`visible fixed left-6 top-6 z-40 order-10 block h-10 w-10 self-center rounded bg-white opacity-100 lg:hidden ${
          isSideNavOpen
            ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
            : ""
        }`}
        aria-haspopup="menu"
        aria-label="Side navigation"
        aria-expanded={isSideNavOpen ? "true" : "false"}
        aria-controls="nav-menu-1"
        onClick={() => setIsSideNavOpen(!isSideNavOpen)}
      >
        <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-gray-300 transition-all duration-300"
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

      {/*  <!-- Side Navigation --> */}
      <aside
        id="nav-menu-1"
        aria-label="Side navigation"
        className={`fixed left-0 top-[66px] z-40 flex w-72 min-h-screen flex-col border-r border-r-slate-200 bg-gray-900 transition-transform lg:translate-x-0 ${
          isSideNavOpen ? "translate-x-0" : " -translate-x-full"
        }`}
      >
        <nav
          aria-label="side navigation"
          className="flex-1 divide-y divide-slate-100 overflow-auto"
        >
          <div>
            <ul className="flex flex-1 flex-col gap-1 py-3">
              <li className="px-3">
                <a
                  href="/user/account"
                  aria-current={pathname === "/user/account" ? "page" : undefined}
                  className="flex items-center gap-3 rounded p-3 text-gray-200 font-semibold transition-colors hover:bg-gray-800 hover:text-blue-500 focus:bg-gray-800 aria-[current=page]:bg-gray-800 aria-[current=page]:text-blue-500 "
                >
                  <SquareUserRound />
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    Compte
                  </div>
                </a>
              </li>
              <li className="px-3">
                <a
                  href="#"
                  className="flex items-center gap-3 rounded p-3 text-gray-200 font-semibold transition-colors hover:bg-gray-800 hover:text-blue-500 focus:bg-gray-800 aria-[current=page]:bg-gray-800 aria-[current=page]:text-blue-500 "
                >
                  <Package />
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    Abonnement
                  </div>
                </a>
              </li>
              <li className="px-3">
                <a
                  href="#"
                  className="flex items-center gap-3 rounded p-3 text-gray-200 font-semibold transition-colors hover:bg-gray-800 hover:text-blue-500 focus:bg-gray-800 aria-[current=page]:bg-gray-800 aria-[current=page]:text-blue-500 "
                >
                  <MonitorCog />
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    Paramètres
                  </div>
                </a>
              </li>
              <li className="px-3">
                <a
                  href="#"
                  className="flex items-center gap-3 rounded p-3 text-gray-200 font-semibold transition-colors hover:bg-gray-800 hover:text-blue-500 focus:bg-gray-800 aria-[current=page]:bg-gray-800 aria-[current=page]:text-blue-500 "
                >
                  <LogOut />
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    Déconnexion
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      {/*  <!-- Backdrop --> */}
      <div
        className={`fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-900/20 transition-colors sm:hidden ${
          isSideNavOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsSideNavOpen(false)}
      ></div>
      {/*  <!-- End Basic side navigation menu --> */}
    </>
  )
}