import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import React from "react";

export default function LogoutButton() {
  return (
    <LogoutLink>
      <li
        className="flex items-start justify-start gap-2 p-2 px-5 text-slate-500 font-semibold transition-colors duration-300
           hover:bg-gray-800 hover:text-blue-500 focus:bg-blue-300 focus:text-blue-600 focus:outline-none focus-visible:outline-none`}"
      >
        Déconnexion
      </li>
    </LogoutLink>
  );
}
