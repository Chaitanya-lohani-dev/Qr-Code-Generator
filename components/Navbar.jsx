'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { QrCodeIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Contact', href: '/contact' },
  { name: 'About', href: '/about' }, // Added for consistency with Footer
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-transparent">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <QrCodeIcon className="h-8 w-auto text-cyan-600" />
            <span className="text-slate-900 font-bold text-xl">QRify</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative text-sm font-semibold leading-6 transition-colors 
                  ${
                    isActive
                      ? 'text-cyan-600 after:scale-x-100'
                      : 'text-slate-900 hover:text-cyan-600 after:scale-x-0 hover:after:scale-x-100'
                  }
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-cyan-600 after:transition-transform after:duration-300 after:origin-bottom-right hover:after:origin-bottom-left
                `}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop auth */}
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-x-6">
          <SignedIn>
            <div className="flex items-center gap-x-6">
              <Link
                href="/dashboard"
                className="text-sm font-semibold leading-6 text-slate-900 hover:text-cyan-600 transition-colors"
              >
                Go to Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
          <SignedOut>
            <Link
              href="/sign-in"
              className="text-sm font-semibold leading-6 text-slate-900 hover:text-cyan-600 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/sign-up"
              className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105"
            >
              Sign up
            </Link>
          </SignedOut>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-sm overflow-y-auto bg-white px-6 py-6 sm:ring-1 sm:ring-slate-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                <QrCodeIcon className="h-8 w-auto text-cyan-600" />
                <span className="text-slate-900 font-semibold text-xl">QRify</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-slate-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-slate-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        aria-current={isActive ? 'page' : undefined}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 
                          ${
                            isActive
                              ? 'text-cyan-600 bg-slate-50'
                              : 'text-slate-900 hover:bg-slate-50'
                          }`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>

                <div className="py-6">
                  <SignedOut>
                    <Link
                      href="/sign-in"
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-slate-900 hover:bg-slate-50"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 mt-2 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white bg-gradient-to-r from-cyan-500 to-blue-600 text-center"
                    >
                      Sign up
                    </Link>
                  </SignedOut>
                  <SignedIn>
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-slate-900 hover:bg-slate-50"
                    >
                      Go to Dashboard
                    </Link>
                    <div className="mt-4 -mx-3 px-3">
                      <UserButton forceRedirectUrl="/" />
                    </div>
                  </SignedIn>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
