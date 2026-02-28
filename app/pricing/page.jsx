"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/20/solid";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import StudentVerification from "@/components/StudentVerification";

const tiers = [
  {
    name: "Free",
    id: "tier-free",
    href: "/sign-up",
    price: { monthly: "₹0", annually: "₹0" },
    description: "Perfect for individuals and small projects to get started.",
    features: [
      "5 QR Codes per month",
      "1 Customizable QR per month",
      "Personal dashboard",
      "High-quality PNG downloads",
      "Basic support",
    ],
    mostPopular: false,
  },
  {
    name: "Student Pro",
    id: "tier-student",
    href: "/contact",
    price: { monthly: "₹199", annually: "₹1,999" },
    description: "Enhanced features for professionals. FREE for verified students with .edu email.",
    features: [
      "Unlimited QR Codes",
      "Unlimited customizable QR codes",
      "Advanced analytics (Coming Soon)",
      "Bulk generation (Coming Soon)",
      "Priority support",
      "FREE with .edu email verification",
    ],
    mostPopular: true,
  },
  {
    name: "Startup",
    id: "tier-startup",
    href: "/contact",
    price: { monthly: "₹499", annually: "₹4,999" },
    description: "For startups and businesses - 50% less than competitors.",
    features: [
      "Everything in Student Pro, plus:",
      "API access (Coming Soon)",
      "Team collaboration (Coming Soon)",
      "Custom integrations (Coming Soon)",
      "Dedicated support",
    ],
    mostPopular: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [studentStatus, setStudentStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, isLoaded } = useUser();

  // Check student verification status
  useEffect(() => {
    if (isLoaded && user) {
      checkStudentStatus();
    } else {
      setLoading(false);
    }
  }, [isLoaded, user]);

  const checkStudentStatus = async () => {
    try {
      const response = await fetch('/api/student/status');
      if (response.ok) {
        const data = await response.json();
        setStudentStatus(data);
      }
    } catch (error) {
      console.error('Error checking student status:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get display price based on student verification status
  const getDisplayPrice = (tier) => {
    if (tier.id === 'tier-student' && studentStatus?.isStudentVerified) {
      return '₹0';
    }
    return tier.price[billingCycle];
  };

  // Get display period based on student verification status
  const getDisplayPeriod = (tier) => {
    if (tier.id === 'tier-student' && studentStatus?.isStudentVerified) {
      return '/forever';
    }
    return `/${billingCycle === "monthly" ? "month" : "year"}`;
  };

  return (
    <>
      {/* SEO Tags */}
      <Head>
        <title>Pricing | QRify</title>
        <meta
          name="description"
          content="Free QR code generation for students and startups. Simple, transparent pricing with no hidden costs."
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
              Affordable pricing for everyone
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-slate-600">
            Free for students, affordable for startups. Built by a student, for the community.
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

          {/* Student Highlight */}
          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-cyan-50 to-blue-50 px-6 py-3 ring-1 ring-cyan-200">
              <span className="text-sm font-medium text-cyan-800">
                🎓 Students with .edu email get Student Pro plan FREE forever
              </span>
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
                    {getDisplayPrice(tier)}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-slate-600">
                    {getDisplayPeriod(tier)}
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
                      "mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 transition-all"
                    )}
                  >
                    {tier.id === "tier-free"
                      ? "Go to Dashboard"
                      : tier.id === "tier-student"
                      ? "Get Student Pro"
                      : "Get Startup Plan"}
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
                      "mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 transition-all"
                    )}
                  >
                    {tier.id === "tier-free"
                      ? "Start Free"
                      : tier.id === "tier-student"
                      ? "Get Student Pro"
                      : "Get Startup Plan"}
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

          {/* Student Verification Section */}
          <div className="mt-16">
            <div className="mx-auto max-w-2xl">
              <h3 className="text-center text-2xl font-bold text-slate-900 mb-8">
                🎓 Student Verification
              </h3>
              <StudentVerification />
            </div>
          </div>

          {/* Trust note */}
          <p className="mt-12 text-center text-sm text-slate-500">
            Students with .edu email get Student Pro FREE. All plans include 14-day money-back guarantee.
          </p>
        </div>
      </div>
    </>
  );
}
