"use client";

import { LogOut, MonitorCog, Package, SquareUserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react"
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function SideBar() {
  // Use the pathname to check if the user is on the current page
  const pathname = usePathname();


  return (
    <aside
      id="nav-menu-1"
      aria-label="Side navigation"
      className="fixed left-0 top-[75px] lg:top-[105px] z-40 flex flex-col border-r border-r-slate-200 bg-gray-900 transition-all duration-300 h-[calc(100vh-72px)] lg:h-[calc(100vh-88px)]
        w-20 md:w-[min(17vw,288px)]"
    >
      <nav
        aria-label="side navigation"
        className="flex-1 divide-y divide-slate-100 overflow-auto"
      >
        <div>
          <ul className="flex flex-1 flex-col gap-1 py-3">
            <li className="px-3">
              <Link
                href="/user/account"
                aria-current={pathname === "/user/account" ? "page" : undefined}
                className="flex items-center gap-3 rounded p-3 text-gray-200 font-semibold transition-colors hover:bg-gray-800 hover:text-blue-500 focus:bg-gray-800 aria-[current=page]:bg-gray-800 aria-[current=page]:text-blue-500"
              >
                <SquareUserRound className="w-6 h-6 min-w-[24px]" />
                <span className="hidden md:block whitespace-nowrap text-sm">
                  Compte
                </span>
              </Link>
            </li>
            <li className="px-3">
              <Link
                href="/user/subscription"
                aria-current={pathname === "/user/subscription" ? "page" : undefined}
                className="flex items-center gap-3 rounded p-3 text-gray-200 font-semibold transition-colors hover:bg-gray-800 hover:text-blue-500 focus:bg-gray-800 aria-[current=page]:bg-gray-800 aria-[current=page]:text-blue-500"
              >
                <Package className="w-6 h-6 min-w-[24px]" />
                <span className="hidden md:block whitespace-nowrap text-sm">
                  Abonnement
                </span>
              </Link>
            </li>
            <li className="px-3">
              <Link
                href="/user/settings"
                aria-current={pathname === "/user/settings" ? "page" : undefined}
                className="flex items-center gap-3 rounded p-3 text-gray-200 font-semibold transition-colors hover:bg-gray-800 hover:text-blue-500 focus:bg-gray-800 aria-[current=page]:bg-gray-800 aria-[current=page]:text-blue-500"
              >
                <MonitorCog className="w-6 h-6 min-w-[24px]" />
                <span className="hidden md:block whitespace-nowrap text-sm">
                  Paramètres
                </span>
              </Link>
            </li>
            <li className="px-3">
              <LogoutLink className="flex items-center gap-3 rounded p-3 text-gray-200 font-semibold transition-colors hover:bg-gray-800 hover:text-blue-500 focus:bg-gray-800">
                <LogOut className="w-6 h-6 min-w-[24px]" />
                <span className="hidden md:block whitespace-nowrap text-sm">
                  Déconnexion
                </span>
              </LogoutLink>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  )
}