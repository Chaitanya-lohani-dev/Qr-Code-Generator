"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import Head from "next/head";
import {
  QrCodeIcon,
  LinkIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>QR Tracker | Create & Track QR Codes Instantly</title>
        <meta
          name="description"
          content="Turn any link into a trackable QR code. Simple, fast, and secure. Create, manage, and track your QR codes with ease."
        />
        <meta
          name="keywords"
          content="QR code generator, track QR, QR analytics, QR tracker app, free QR code"
        />
      </Head>

      <main className="isolate bg-slate-50">
        {/* Hero Section */}
        <div className="relative pt-14">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-cyan-400 to-sky-500 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>

          {/* Hero Content */}
          <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
                  Create & Track QR Codes Instantly
                </h1>
                <p className="mt-6 text-lg leading-8 text-slate-600">
                  Turn any link into a trackable QR code. Simple, fast, and
                  free. Sign up to get started and manage all your codes in one
                  place.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <SignedOut>
                    <Link
                      href="/sign-up"
                      className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105"
                    >
                      Get started for free
                    </Link>
                  </SignedOut>
                  <SignedIn>
                    <Link
                      href="/dashboard"
                      className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105"
                    >
                      Go to your Dashboard
                    </Link>
                  </SignedIn>
                  <a
                    href="#features"
                    className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-all"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-cyan-600">
                Everything You Need
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                A better way to manage your links
              </p>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Our platform provides all the essential tools to generate and
                track your QR codes with ease.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
                {/* Feature Card 1 */}
                <div className="group relative flex flex-col rounded-xl bg-white p-8 shadow-lg ring-1 ring-slate-900/5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 min-h-[220px]">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900 group-hover:text-cyan-600">
                    <QrCodeIcon className="h-5 w-5 text-cyan-600 group-hover:scale-110 transition-transform" />
                    Instant QR Generation
                  </dt>
                  <dd className="mt-4 text-base leading-7 text-slate-600">
                    Paste any valid URL and get a high-quality QR code in
                    seconds.
                  </dd>
                </div>

                {/* Feature Card 2 */}
                <div className="group relative flex flex-col rounded-xl bg-white p-8 shadow-lg ring-1 ring-slate-900/5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 min-h-[220px]">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900 group-hover:text-cyan-600">
                    <LinkIcon className="h-5 w-5 text-cyan-600 group-hover:scale-110 transition-transform" />
                    Simple Tracking
                  </dt>
                  <dd className="mt-4 text-base leading-7 text-slate-600">
                    All your QR codes are saved in your dashboard for easy
                    tracking.
                  </dd>
                </div>

                {/* Feature Card 3 */}
                <div className="group relative flex flex-col rounded-xl bg-white p-8 shadow-lg ring-1 ring-slate-900/5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 min-h-[220px]">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900 group-hover:text-cyan-600">
                    <ShieldCheckIcon className="h-5 w-5 text-cyan-600 group-hover:scale-110 transition-transform" />
                    Secure & Private
                  </dt>
                  <dd className="mt-4 text-base leading-7 text-slate-600">
                    Your data is encrypted and always tied to your private
                    account.
                  </dd>
                </div>

                {/* Feature Card 4 (new) */}
                <div className="group relative flex flex-col rounded-xl bg-white p-8 shadow-lg ring-1 ring-slate-900/5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 min-h-[220px]">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900 group-hover:text-cyan-600">
                    <ChartBarIcon className="h-5 w-5 text-cyan-600 group-hover:scale-110 transition-transform" />
                    Analytics (Coming Soon)
                  </dt>
                  <dd className="mt-4 text-base leading-7 text-slate-600">
                    Track how many times your QR codes are scanned with rich
                    insights.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        {/* Testimonials Section */}
        <div
          id="testimonials"
          className="bg-gradient-to-b from-slate-50 to-white py-24 sm:py-32"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-base font-semibold leading-7 text-cyan-600">
              Loved by Early Users
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              See what people are saying
            </p>
            <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-slate-600">
              Testimonials from our early users (real stories coming soon 🚀).
            </p>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "John Doe",
                  role: "Small Business Owner",
                  text: "This tool simplified QR tracking for my shop — quick and reliable.",
                  img: "https://i.pravatar.cc/150?img=1",
                },
                {
                  name: "Sarah Lee",
                  role: "Event Manager",
                  text: "Managing event check-ins with QR Tracker was a breeze. Highly recommend!",
                  img: "https://i.pravatar.cc/150?img=2",
                },
                {
                  name: "Mike Patel",
                  role: "Freelancer",
                  text: "Finally a QR tool that gives me both design + analytics. Love it!",
                  img: "https://i.pravatar.cc/150?img=3",
                },
              ].map((t, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 transition-all hover:shadow-2xl"
                >
                  <img
                    src={t.img}
                    alt={t.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <p className="mt-4 text-base text-slate-700 italic">
                    “{t.text}”
                  </p>
                  <div className="mt-3 text-sm font-semibold text-slate-900">
                    {t.name}
                  </div>
                  <div className="text-sm text-slate-500">{t.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-base font-semibold leading-7 text-cyan-600">
                Frequently Asked Questions
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Got questions? We’ve got answers
              </p>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Everything you need to know about QR Tracker.
              </p>
            </div>

            <div className="mt-16 max-w-3xl mx-auto divide-y divide-slate-200">
              {[
                {
                  q: "What is QR Tracker?",
                  a: "QR Tracker lets you create QR codes instantly and track scans in real time, all in one dashboard.",
                },
                {
                  q: "Is there a free plan?",
                  a: "Yes! You can create and manage QR codes for free. Advanced analytics will be available in premium plans.",
                },
                {
                  q: "Do I need to install an app?",
                  a: "No app needed. Everything works in your browser, across devices.",
                },
                {
                  q: "Can I customize my QR codes?",
                  a: "Customization options like colors, logos, and styles are on our roadmap.",
                },
                {
                  q: "How secure is my data?",
                  a: "All data is encrypted and tied securely to your Clerk account.",
                },
              ].map((faq, i) => (
                <details
                  key={i}
                  className="group py-6 transition-all duration-300 open:shadow-sm"
                >
                  <summary className="flex cursor-pointer items-center justify-between text-lg font-medium text-slate-900 group-open:text-cyan-600">
                    {faq.q}
                    <span className="ml-4 text-slate-400 group-open:rotate-180 transition-transform">
                      ⌄
                    </span>
                  </summary>
                  <p className="mt-4 text-base text-slate-600">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative isolate overflow-hidden bg-white px-6 py-24 text-center shadow-2xl rounded-2xl sm:px-16 ring-1 ring-slate-900/5">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Ready to get started?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
                🚀 Join 50+ users already creating QR codes daily.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <SignedOut>
                  <Link
                    href="/sign-up"
                    className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105"
                  >
                    Sign up for free{" "}
                    <ArrowRightIcon className="inline h-4 w-4 ml-2" />
                  </Link>
                </SignedOut>
                <SignedIn>
                  <Link
                    href="/dashboard"
                    className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105"
                  >
                    Go to your Dashboard{" "}
                    <ArrowRightIcon className="inline h-4 w-4 ml-2" />
                  </Link>
                </SignedIn>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
