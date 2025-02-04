"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Shield, CreditCard, Bell } from "lucide-react";
import AnimatedTitle from "@/components/AnimatedTitle";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const { user } = useKindeBrowserClient();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // ou un loader/skeleton
  }

  return (
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="mb-8">
            <AnimatedTitle
              title="Paramètres du compte"
              containerClass="text-left !text-2xl"
            />
            <p className="text-gray-400 mt-2">
              Gérez vos informations personnelles et vos préférences
            </p>
          </div>

          {/* Profile Section */}
          <section className="bg-gray-800/80 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold text-white">
                {user?.given_name?.[0]}{user?.family_name?.[0]}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-100">
                  {user?.given_name} {user?.family_name}
                </h2>
                <p className="text-gray-400">{user?.email}</p>
              </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Prénom</label>
                <input
                  type="text"
                  value={user?.given_name || ""}
                  disabled
                  className="w-full p-2 bg-gray-700/50 rounded-lg border border-gray-700 text-gray-200"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Nom</label>
                <input
                  type="text"
                  value={user?.family_name || ""}
                  disabled
                  className="w-full p-2 bg-gray-700/50 rounded-lg border border-gray-700 text-gray-200"
                />
              </div>
            </div>
          </section>

          {/* Quick Actions Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Subscription Status */}
            <div className="bg-gray-800/80 rounded-xl p-6 border border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-100">Abonnement</h3>
              </div>
              <p className="text-gray-400 mb-4">Plan actuel: Free</p>
              <a
                href="/user/subscription"
                className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
              >
                Gérer l&apos;abonnement
              </a>
            </div>

            {/* Payment Methods */}
            <div className="bg-gray-800/80 rounded-xl p-6 border border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-6 h-6 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-100">Paiement</h3>
              </div>
              <p className="text-gray-400 mb-4">Aucune carte enregistrée</p>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors">
                Ajouter une carte
              </button>
            </div>
          </div>

          {/* Preferences Section */}
          <section className="bg-gray-800/80 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-gray-100 mb-6">Préférences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-gray-200">Notifications email</p>
                    <p className="text-sm text-gray-400">Recevoir des mises à jour sur vos tournois</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </section>
        </div>
      </main>
  );
}
