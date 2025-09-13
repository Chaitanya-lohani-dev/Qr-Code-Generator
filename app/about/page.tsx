// app/about/page.tsx
"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen text-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-6 lg:px-16 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          About <span className="text-indigo-600">Our Platform</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
          A project built with passion to simplify QR code generation and
          management for everyone — from individuals to businesses.
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 lg:px-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">My Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            I started this platform with a simple idea: make digital connections
            effortless. Whether you’re sharing content, promoting your work, or
            running a business, QR codes should be simple, secure, and scalable.
            This project is a step toward making that vision a reality.
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 px-6 lg:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Built by a Solo Developer
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Hi, I’m <span className="font-semibold">Chaitanya Lohani</span>, the
            developer behind this project. This platform is not just a project,
            but a journey of learning, experimenting, and building tools that
            help others connect better.
          </p>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 px-6 lg:px-16 bg-indigo-600 text-center text-white">
        <h2 className="text-3xl font-bold">Ready to get started?</h2>
        <p className="mt-4 text-lg max-w-xl mx-auto">
          Join me on this journey and start creating smarter connections with
          custom QR codes.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </section>
    </main>
  );
}
