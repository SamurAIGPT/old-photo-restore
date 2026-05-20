"use client";

import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import { FaCheck, FaCameraRetro } from "react-icons/fa";

export default function PricingPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(null);

  const handleCheckout = async (planId) => {
    if (!session) {
      signIn("google");
      return;
    }

    try {
      setLoading(planId);
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });

      if (!res.ok) throw new Error("Failed to create checkout");

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
      alert("Checkout error. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  const plans = [
    {
      id: "standard",
      name: "Standard Restoration Pack",
      price: "$5.00",
      credits: 1000,
      description: "Great for restoring family albums and individual archives.",
      features: [
        "Over 55 full high-res restorations (18 credits each)",
        "Advanced face clarity refinement",
        "Colorization & de-scratching modes",
        "Prompt engineering control settings",
        "High-definition download formats"
      ],
      tag: "Best Value"
    },
    {
      id: "pro",
      name: "Pro Archive Pack",
      price: "$10.00",
      credits: 2000,
      description: "Designed for historians, antique dealers, and high-volume restorers.",
      features: [
        "Over 110 full high-res restorations (18 credits each)",
        "Advanced face clarity refinement",
        "Colorization & de-scratching modes",
        "Priority restoration processing queue",
        "VIP customer support channel",
        "High-definition download formats"
      ],
      tag: "Popular"
    }
  ];

  return (
    <main className="flex-1 overflow-y-auto bg-zinc-950 px-6 py-16 text-zinc-100">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-indigo-400 shadow-lg">
          <FaCameraRetro className="text-md" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Simple, Credit-Based Pricing
        </h1>
        <p className="mt-3 text-zinc-400 max-w-md mx-auto text-sm leading-relaxed">
          Top up your account with credits to restore old photos to their former glory. Each restoration costs exactly 18 credits.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="flex flex-col justify-between bg-zinc-900 border border-zinc-800/80 p-8 rounded-3xl transition-all hover:border-zinc-700/80 shadow-2xl"
          >
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-md font-bold text-white">{plan.name}</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-900/30 text-[9px] font-bold">
                  {plan.tag}
                </span>
              </div>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">{plan.description}</p>
              
              <div className="mt-5 flex items-baseline">
                <span className="text-3xl font-black tracking-tight text-white">{plan.price}</span>
                <span className="ml-1 text-xs text-zinc-500">/ one-time</span>
              </div>

              <div className="mt-5 py-2.5 border-y border-zinc-800/60 flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-400">Credits Included</span>
                <span className="text-md font-bold text-indigo-400">{plan.credits} credits</span>
              </div>

              <ul className="mt-6 space-y-3 pt-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <FaCheck className="mt-0.5 text-indigo-400 flex-shrink-0 text-[9px]" />
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleCheckout(plan.id)}
              disabled={loading !== null}
              className="mt-8 w-full py-2.5 bg-white hover:bg-zinc-100 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-zinc-950 font-bold text-xs rounded-full transition-all cursor-pointer shadow-md"
            >
              {loading === plan.id ? "Redirecting..." : `Buy Credits`}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
