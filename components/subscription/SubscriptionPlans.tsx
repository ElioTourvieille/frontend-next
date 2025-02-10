'use client'
import React from "react"
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { toast } from "sonner";

const tiers = [
  {
    name: "Free",
    id: "free",
    price: "0",
    current: true,
    features: [
      "Filtres limités",
      "Fonctionnalités de base",
      "Une seule grille"
    ],
  },
  {
    name: "Premium",
    id: "premium",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID,
    price: "14.99",
    features: [
      "Grilles illimitées",
      "Support prioritaire",
      "Statistiques avancées"
    ],

  },
  {
    name: "Elite",
    id: "elite",
    priceId: process.env.NEXT_PUBLIC_STRIPE_ELITE_PRICE_ID,
    price: "24.99",
    features: [
      "Tout ce qui est inclus dans Premium",
      "Fonctionnalités exclusives",
      "Accès anticipé"
    ],
 
  },
];

export default function SubscriptionPlans() {
  const handleSubscribe = async (priceId: string) => {
    try {

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!data.url) {
        throw new Error('No checkout URL received');
      }

      window.location.href = data.url;
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Une erreur est survenue lors de la souscription. Veuillez réessayer.');
    }
  };

  return (
    <div className="mx-auto mt-10 lg:mt-20 max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
      <h2 className="mb-20 text-4xl text-gray-300 font-bold tracking-tight sm:text-5xl">
          Choisissez votre plan
        </h2>
      </div>


      <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">

        {tiers.map((tier) => (
          <div
            key={tier.id}
            className="rounded-3xl p-8 bg-gray-900/80 text-gray-300 border border-gray-800 ring-1 ring-gray-200 dark:ring-gray-700 xl:p-10"
          >
            <div className="flex items-center justify-between gap-x-4">
              <h3 className="text-lg font-semibold leading-8">
                {tier.name}
              </h3>
              {tier.current && (
                <span className="rounded-full bg-gray-300/10 px-2.5 py-1 text-xs font-semibold leading-5 text-gray-400">
                  Plan actuel
                </span>
              )}
            </div>
            <p className="mt-4 text-sm leading-6">
              <span className="text-4xl font-bold">{tier.price}€</span>
              <span className="text-sm font-semibold">/mois</span>
            </p>
            <ul className="mt-8 space-y-3">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            {!tier.current && (
              <Button
                className="mt-8 w-full"
                onClick={() => tier.priceId && handleSubscribe(tier.priceId)}
              >
                Souscrire à {tier.name}
              </Button>
            )}
            {tier.current && (
              <Button
                variant="outline"
                className="mt-8 w-full"
                disabled
              >
                Votre plan actuel
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 