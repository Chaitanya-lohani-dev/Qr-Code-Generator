"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

// Simple Switch component for the privacy policy toggle
function Switch({ enabled, setEnabled }) {
  return (
    <button
      type="button"
      className={`${
        enabled ? "bg-cyan-600" : "bg-slate-200"
      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2`}
      role="switch"
      aria-checked={enabled}
      onClick={() => setEnabled(!enabled)}
    >
      <span className="sr-only">Agree to policies</span>
      <span
        aria-hidden="true"
        className={`${
          enabled ? "translate-x-5" : "translate-x-0"
        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
      />
    </button>
  );
}

export default function ContactPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [isClient, setIsClient] = useState(false); // hydration fix

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setSubmissionStatus(null);
    const formData = { firstName, lastName, email, phoneNumber, message };
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        setSubmissionStatus("success");
        setSubmissionMessage(result.message || "Message sent successfully!");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setMessage("");
        setAgreed(false);
      } else {
        setSubmissionStatus("error");
        setSubmissionMessage(
          result.error || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      setSubmissionStatus("error");
      setSubmissionMessage(
        "An unexpected error occurred. Please check your connection."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | QRify</title>
        <meta
          name="description"
          content="Get in touch with QRify. Have questions about our pricing, features, or custom solutions? Contact our team today."
        />
      </Head>

      <div className="relative isolate bg-slate-50">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          {/* Contact Info Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48"
          >
            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Get in touch
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Have questions about our plans, features, or anything else? Fill
                out the form and we'll get back to you shortly.
              </p>
              
              {/* Response Time Info */}
              <div className="mt-8 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                <h3 className="text-sm font-semibold text-cyan-800 mb-2">Response Times</h3>
                <ul className="text-sm text-cyan-700 space-y-1">
                  <li>• General inquiries: Within 24 hours</li>
                  <li>• Student support: Within 12 hours</li>
                  <li>• Technical issues: Within 6 hours</li>
                  <li>• Business inquiries: Within 48 hours</li>
                </ul>
                <p className="text-xs text-cyan-600 mt-2">
                  💡 Students with .edu email addresses get priority support and enhanced features!
                </p>
              </div>
              <dl className="mt-10 space-y-4 text-base leading-7 text-slate-600">
                <div className="flex gap-x-4 items-center">
                  <BuildingOffice2Icon
                    className="h-7 w-6 text-cyan-600"
                    aria-hidden="true"
                  />
                  <dd>
                    Ghaziabad, Uttar Pradesh <br />
                    India
                  </dd>
                </div>
                <div className="flex gap-x-4 items-center">
                  <EnvelopeIcon
                    className="h-7 w-6 text-cyan-600"
                    aria-hidden="true"
                  />
                  <dd>
                    <a
                      className="hover:text-slate-900"
                      href="mailto:chaitanyalohani175@gmail.com"
                    >
                      chaitanyalohani175@gmail.com
                    </a>
                  </dd>
                </div>
                <div className="flex gap-x-4 items-center">
                  <EnvelopeIcon
                    className="h-7 w-6 text-cyan-600"
                    aria-hidden="true"
                  />
                  <dd>
                    <a
                      className="hover:text-slate-900"
                      href="mailto:hello@qrify.com"
                    >
                      hello@qrify.com
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </motion.div>

          {/* Contact Form */}
          {isClient && (
            <motion.form
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
              className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48"
            >
              <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-semibold leading-6 text-slate-900"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      autoComplete="given-name"
                      className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 transition"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-semibold leading-6 text-slate-900"
                    >
                      Last name
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      autoComplete="family-name"
                      className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 transition"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold leading-6 text-slate-900"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 transition"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone-number"
                      className="block text-sm font-semibold leading-6 text-slate-900"
                    >
                      Phone number
                    </label>
                    <input
                      type="tel"
                      id="phone-number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      autoComplete="tel"
                      className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 transition"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold leading-6 text-slate-900"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 transition"
                    />
                  </div>
                  <div className="flex gap-x-4 sm:col-span-2">
                    <Switch enabled={agreed} setEnabled={setAgreed} />
                    <label
                      className="text-sm leading-6 text-slate-600"
                      id="switch-1-label"
                    >
                      By selecting this, you agree to our{" "}
                      <a
                        href="/privacy-policy"
                        className="font-semibold text-cyan-600 hover:underline"
                      >
                        privacy&nbsp;policy
                      </a>
                      .
                    </label>
                  </div>
                </div>

                {/* Success / Error Messages */}
                {submissionStatus && (
                  <div
                    className={`mt-6 p-4 rounded-md text-sm sm:col-span-2 ${
                      submissionStatus === "success"
                        ? "bg-green-50 text-green-800 ring-1 ring-inset ring-green-200"
                        : "bg-red-50 text-red-800 ring-1 ring-inset ring-red-200"
                    }`}
                  >
                    <div className="flex">
                      <div className="flex-shrink-0">
                        {submissionStatus === "success" ? (
                          <CheckCircleIcon
                            className="h-5 w-5 text-green-400"
                            aria-hidden="true"
                          />
                        ) : (
                          <XCircleIcon
                            className="h-5 w-5 text-red-400"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <div className="ml-3">
                        <p>{submissionMessage}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <div className="mt-8 flex justify-end sm:col-span-2">
                  <button
                    type="submit"
                    disabled={!agreed || isLoading}
                    className="flex items-center gap-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-cyan-600 hover:to-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:scale-100"
                  >
                    {isLoading && (
                      <svg
                        className="h-4 w-4 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                    )}
                    {isLoading ? "Sending..." : "Send message"}
                  </button>
                </div>
              </div>
            </motion.form>
          )}
        </div>
      </div>
    </>
  );
}
