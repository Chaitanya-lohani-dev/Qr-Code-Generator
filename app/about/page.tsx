"use client";

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { RocketLaunchIcon, UserCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function AboutPage() {
  return (
    <main className="isolate bg-slate-50">
      {/* Hero Section */}
      <div className="relative pt-24 sm:pt-32">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-cyan-400 to-sky-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="py-16 sm:py-24 px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            About <span className="text-cyan-600">QRify</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-slate-600">
            A project built with passion to simplify QR code generation and management for everyone — from individuals to businesses.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <div className="bg-white p-10 rounded-2xl shadow-lg ring-1 ring-slate-900/5 text-center">
              <RocketLaunchIcon className="mx-auto h-12 w-12 text-cyan-500"/>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">My Mission</h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                I started this platform with a simple idea: make digital connections effortless. Whether you&rsquo;re sharing content, promoting your work, or running a business, QR codes should be simple, secure, and scalable. This project is a step toward making that vision a reality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
                <div className="bg-white p-10 rounded-2xl shadow-lg ring-1 ring-slate-900/5">
                    <div className="text-center mb-8">
                        <UserCircleIcon className="mx-auto h-16 w-16 text-slate-400" />
                        <h2 className="mt-4 text-2xl font-semibold leading-8 text-slate-900">
                            Built by a Student Developer
                        </h2>
                    </div>
                    
                    <div className="space-y-6 text-lg leading-8 text-slate-600">
                        <p>
                        Hi, I&rsquo;m <span className="font-semibold text-slate-800">Chaitanya Lohani</span>, a 3rd year B.Sc(Prog.) Physical Science with Chemistry student from University of Delhi. Despite coming from a non-tech background, I discovered my passion for coding in 11th and 12th grade when I first learned Python.
                        </p>
                        
                        <p>
                        Currently, I serve as the <span className="font-semibold text-cyan-600">President of IIC (Institution&rsquo;s Innovation Council)</span> at my university. IIC is an initiative under the Ministry of Education that promotes innovation and entrepreneurship among college students. Last year, I was the Tech Head of IIC, where I realized the crucial role QR codes play in student organizations and startups.
                        </p>
                        
                        <p>
                        From event promotions to registrations, we constantly needed QR codes, but existing tools were either expensive or had limitations that didn&rsquo;t work for students and small businesses. As students, we couldn&rsquo;t afford premium pricing, and many tools would expire our QR codes after a few days.
                        </p>
                        
                        <p className="font-medium text-slate-800">
                        That&rsquo;s why I created QRify — a free, reliable platform that empowers students, small businesses, and startups to grow without worrying about costs or limitations.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Development Journey Section */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-cyan-600">The Journey</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              From Student to Developer
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              How a non-tech background led to building a tool that helps others.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="space-y-8">
              {[
                {
                  year: "11th-12th Grade",
                  title: "First Steps in Coding",
                  description: "Discovered Python and fell in love with programming, despite being from a science background.",
                  icon: "🎓"
                },
                {
                  year: "University of Delhi",
                  title: "B.Sc Physical Science",
                  description: "Pursuing Chemistry while self-learning computer science and web development.",
                  icon: "🧪"
                },
                {
                  year: "2024-2025",
                  title: "Tech Head at IIC",
                  description: "Led technology initiatives and realized the need for affordable QR code solutions for student organizations.",
                  icon: "💻"
                },
                {
                  year: "2025-2026",
                  title: "President at IIC",
                  description: "Now leading innovation and entrepreneurship initiatives while building QRify to solve real problems.",
                  icon: "🚀"
                }
              ].map((milestone, index) => (
                <div key={index} className="relative pl-16 transition-all duration-300 hover:scale-105">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600">
                    <span className="text-lg">{milestone.icon}</span>
                  </div>
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">{milestone.title}</h3>
                    <span className="inline-flex items-center rounded-full bg-cyan-100 px-3 py-1 text-sm font-medium text-cyan-800">
                      {milestone.year}
                    </span>
                  </div>
                  <p className="text-base leading-7 text-slate-600">{milestone.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-cyan-600">The Vision</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Empowering the Next Generation
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Building tools that help students and startups succeed without financial barriers.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {[
                {
                  title: "For Students",
                  description: "Free QR codes for college societies, events, and projects. No expiration dates, no hidden costs.",
                  icon: "🎓",
                  color: "from-cyan-500 to-blue-600"
                },
                {
                  title: "For Startups",
                  description: "Affordable solutions for small businesses and entrepreneurs to grow their digital presence.",
                  icon: "🚀",
                  color: "from-blue-500 to-indigo-600"
                }
              ].map((vision, index) => (
                <div key={index} className="group relative rounded-xl bg-white p-8 shadow-lg ring-1 ring-slate-900/5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${vision.color} mb-4`}>
                    <span className="text-2xl">{vision.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 group-hover:text-cyan-600 transition-colors mb-3">
                    {vision.title}
                  </h3>
                  <p className="text-base leading-7 text-slate-600">
                    {vision.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
       <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-white px-6 py-24 text-center shadow-2xl rounded-2xl sm:px-16 ring-1 ring-slate-900/5">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Join me on this journey and start creating smarter connections with custom QR codes.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <SignedOut>
                  <Link
                    href="/sign-up"
                    className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
                  >
                    Sign up for free <ArrowRightIcon className="inline h-4 w-4 ml-2"/>
                  </Link>
              </SignedOut>
              <SignedIn>
                  <Link
                    href="/dashboard"
                    className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
                  >
                    Go to your Dashboard <ArrowRightIcon className="inline h-4 w-4 ml-2"/>
                  </Link>
              </SignedIn>
            </div>
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              aria-hidden="true"
            >
              <circle cx={512} cy={512} r={512} fill="url(#8d958450-c69f-4251-94bc-4e09d834fad6)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="8d958450-c69f-4251-94bc-4e09d834fad6">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#1D4ED8" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </main>
  );
}

