'use client'
import React from "react"

export default function SubscriptionPlans() {
  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-100">Abonnements</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 max-w-[1400px] mx-auto">
        {/* Free Plan */}
        <div className="w-full max-w-md mx-auto overflow-hidden rounded-xl bg-gray-900/50 border border-gray-800 text-gray-300">
          <div className="flex flex-col">
            <header className="flex flex-col gap-6 p-6">
              <h3 className="text-xl font-bold text-gray-100">
                Free
                <span className="block text-sm font-normal text-gray-400">
                  Plan de base gratuit
                </span>
              </h3>
              <h4>
                <span className="text-3xl">€</span>
                <span className="text-5xl font-bold tracking-tighter text-gray-100 transition-all duration-300 lg:text-6xl">
                  0
                </span>
                <span className="text-sm">/mois</span>
              </h4>
              <button className="inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-blue-600 px-6 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-blue-700 focus:bg-blue-700">
                <span>Plan actuel</span>
              </button>
            </header>
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 shrink-0 p-1 text-blue-500">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                  Recherche de tournois basique
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 shrink-0 p-1 text-blue-500">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                  Filtres limités
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Premium Plan */}
        <div className="w-full max-w-md mx-auto overflow-hidden rounded-xl bg-gray-900/50 border-2 border-blue-500 text-gray-300">
          <div className="flex flex-col">
            <header className="flex flex-col gap-6 p-6">
              <h3 className="text-xl font-bold text-gray-100">
                Premium
                <span className="block text-sm font-normal text-gray-400">
                  Pour les joueurs réguliers
                </span>
              </h3>
              <h4>
                <span className="text-3xl">€</span>
                <span className="text-5xl font-bold tracking-tighter text-gray-100 transition-all duration-300 lg:text-6xl">
                  9.99
                </span>
                <span className="text-sm">/mois</span>
              </h4>
              <button className="inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-blue-600 px-6 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-blue-700 focus:bg-blue-700">
                <span>Souscrire</span>
              </button>
            </header>
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 shrink-0 p-1 text-blue-500">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                  Toutes les fonctionnalités Free
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 shrink-0 p-1 text-blue-500">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                  Création de grilles illimitées
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 shrink-0 p-1 text-blue-500">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                  Statistiques avancées
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Elite Plan */}
        <div className="w-full max-w-md mx-auto overflow-hidden rounded-xl bg-gray-900/50 border border-gray-800 text-gray-300">
          <div className="flex flex-col">
            <header className="flex flex-col gap-6 p-6">
              <h3 className="text-xl font-bold text-gray-100">
                Elite
                <span className="block text-sm font-normal text-gray-400">
                  Pour les professionnels
                </span>
              </h3>
              <h4>
                <span className="text-3xl">€</span>
                <span className="text-5xl font-bold tracking-tighter text-gray-100 transition-all duration-300 lg:text-6xl">
                  19.99
                </span>
                <span className="text-sm">/mois</span>
              </h4>
              <button className="inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-blue-600 px-6 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-blue-700 focus:bg-blue-700">
                <span>Souscrire</span>
              </button>
            </header>
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 shrink-0 p-1 text-blue-500">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                  Toutes les fonctionnalités Premium
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 shrink-0 p-1 text-blue-500">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                  Assistant IA (bientôt disponible)
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 shrink-0 p-1 text-blue-500">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                  Support prioritaire
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 