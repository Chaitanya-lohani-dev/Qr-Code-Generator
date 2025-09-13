"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/20/solid";
import { SignedIn, SignedOut } from "@clerk/nextjs";

const tiers = [
  {
    name: "Free",
    id: "tier-free",
    href: "/sign-up",
    price: { monthly: "₹0", annually: "₹0" },
    description: "Perfect for individuals and personal projects to get started.",
    features: [
      "5 QR Codes per month",
      "Basic tracking dashboard",
      "Standard email support",
      "High-quality PNG downloads",
    ],
    mostPopular: false,
  },
  {
    name: "Pro",
    id: "tier-pro",
    href: "/sign-up", // Replace with payment link later
    price: { monthly: "₹499", annually: "₹4,999" },
    description: "For professionals and small businesses who need more power.",
    features: [
      "Unlimited QR Codes",
      "Advanced analytics & tracking",
      "Priority email & chat support",
      "Custom branding on QR codes",
      "API Access",
    ],
    mostPopular: true,
  },
  {
    name: "Business",
    id: "tier-business",
    href: "/contact",
    price: { monthly: "₹1,999", annually: "₹19,999" },
    description: "For large teams and companies needing advanced features.",
    features: [
      "Everything in Pro, plus:",
      "Team collaboration features",
      "Dedicated account manager",
      "Custom integrations",
      "Enterprise-grade security",
    ],
    mostPopular: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  return (
    <>
      {/* SEO Tags */}
      <Head>
        <title>Pricing | QR SaaS</title>
        <meta
          name="description"
          content="Simple, transparent pricing for QR code generation and analytics. Get started free or upgrade for pro features."
        />
      </Head>

      <div className="bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-cyan-600">
              Pricing
            </h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Simple, transparent pricing for everyone
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-slate-600">
            Choose the plan that's right for you. Get started for free, and
            upgrade whenever you need more power.
          </p>

          {/* Billing cycle toggle */}
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-x-4 rounded-full bg-white p-1 shadow-md">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={classNames(
                  billingCycle === "monthly"
                    ? "bg-cyan-600 text-white"
                    : "text-slate-700",
                  "px-4 py-2 text-sm font-medium rounded-full transition"
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("annually")}
                className={classNames(
                  billingCycle === "annually"
                    ? "bg-cyan-600 text-white"
                    : "text-slate-700",
                  "px-4 py-2 text-sm font-medium rounded-full transition"
                )}
              >
                Annually <span className="ml-1 text-xs text-green-600">Save 15%</span>
              </button>
            </div>
          </div>

          {/* Pricing cards */}
          <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {tiers.map((tier, tierIdx) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: tierIdx * 0.2 }}
                className={classNames(
                  tier.mostPopular
                    ? "ring-2 ring-cyan-600 scale-105 shadow-2xl"
                    : "lg:mt-8",
                  "rounded-3xl bg-white p-8 xl:p-10 transition-transform duration-300"
                )}
              >
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className="text-lg font-semibold leading-8 text-slate-900"
                  >
                    {tier.name}
                  </h3>
                  {tier.mostPopular ? (
                    <p className="rounded-full bg-cyan-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-cyan-600">
                      Most popular
                    </p>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-slate-900">
                    {tier.price[billingCycle]}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-slate-600">
                    /{billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </p>

                {/* CTA Buttons */}
                <SignedIn>
                  <Link
                    href={tier.mostPopular ? "/dashboard" : tier.href}
                    aria-describedby={tier.id}
                    className={classNames(
                      tier.mostPopular
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm hover:from-cyan-600 hover:to-blue-700"
                        : "text-cyan-600 ring-1 ring-inset ring-cyan-200 hover:ring-cyan-300",
                      "mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 transition-all"
                    )}
                  >
                    {tier.id === "tier-free"
                      ? "Continue with Free"
                      : tier.id === "tier-pro"
                      ? "Upgrade to Pro"
                      : "Contact Sales"}
                  </Link>
                </SignedIn>

                <SignedOut>
                  <Link
                    href={tier.href}
                    aria-describedby={tier.id}
                    className={classNames(
                      tier.mostPopular
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm hover:from-cyan-600 hover:to-blue-700"
                        : "text-cyan-600 ring-1 ring-inset ring-cyan-200 hover:ring-cyan-300",
                      "mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 transition-all"
                    )}
                  >
                    {tier.id === "tier-free"
                      ? "Start Free"
                      : tier.id === "tier-pro"
                      ? "Upgrade to Pro"
                      : "Contact Sales"}
                  </Link>
                </SignedOut>

                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-slate-600 xl:mt-10"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className="h-6 w-5 flex-none text-cyan-600"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Trust note */}
          <p className="mt-12 text-center text-sm text-slate-500">
            14-day money-back guarantee. No hidden fees.
          </p>
        </div>
      </div>
    </>
  );
}
