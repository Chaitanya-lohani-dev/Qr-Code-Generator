import { CheckBadgeIcon, BoltIcon, Squares2X2Icon, CloudArrowDownIcon, DevicePhoneMobileIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import Head from 'next/head'

// ✅ Page metadata for SEO
export const metadata = {
  title: "Features | QRify",
  description:
    "Explore all the features of QRify — instant QR code creation, personal dashboard, secure authentication, and fully responsive design.",
  keywords: [
    "QR code features",
    "QRify tools",
    "QR code tracker",
    "QR code generator",
    "QR dashboard",
  ],
}

// ✅ Structured data schema (FAQ-style for SEO rich results)
const featureSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does QRify generate QR codes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Just paste your URL and get a high-resolution QR code in seconds. Our engine ensures instant generation."
      }
    },
    {
      "@type": "Question",
      "name": "Can I manage my QR codes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all your QR codes are automatically saved to your secure, personal dashboard so you never lose track."
      }
    },
    {
      "@type": "Question",
      "name": "Is QRify secure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We use modern authentication powered by Clerk to keep your account and data safe."
      }
    }
  ]
}

// ✅ Feature list
const features = [
  {
    name: 'Instant QR Generation',
    description:
      'Just paste your URL and get a high-resolution QR code in seconds. Our powerful engine ensures your codes are generated instantly.',
    icon: BoltIcon,
  },
  {
    name: 'Personal Dashboard',
    description:
      'All your created QR codes are automatically saved to your secure, personal dashboard. Never lose track of a link again.',
    icon: Squares2X2Icon,
  },
  {
    name: 'Secure Authentication',
    description:
      'We use modern authentication provided by Clerk to keep your account safe. Log in easily with Google or your email.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'High-Quality Downloads',
    description:
      'Download your QR codes as high-quality PNG files, perfect for both digital use and high-resolution printing.',
    icon: CloudArrowDownIcon,
  },
  {
    name: 'Track Your Codes',
    description:
      'Easily name and manage your QR codes to remember what each one is for. Keep your marketing campaigns and personal links organized.',
    icon: CheckBadgeIcon,
  },
  {
    name: 'Fully Responsive',
    description:
      'Whether you are on your phone, tablet, or desktop, our platform is designed to work seamlessly on any device.',
    icon: DevicePhoneMobileIcon,
  },
]

export default function FeaturesPage() {
  return (
    <>
      {/* ✅ Structured data injection */}
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(featureSchema)}
        </script>
      </Head>

      <div className="bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* ✅ h1 for SEO */}
          <div className="mx-auto max-w-2xl lg:text-center">
            <h1 className="text-base font-semibold leading-7 text-cyan-600">Our Features</h1>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything you need to create and manage QR codes
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Our platform is packed with powerful features designed to make your life easier, 
              whether you're a marketer, a business owner, or just sharing links.
            </p>
          </div>

          {/* ✅ Feature list */}
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16 transition-all duration-300 hover:scale-105">
                  <dt className="text-base font-semibold leading-7 text-slate-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-slate-600">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ✅ Call to Action */}
          <div className="mt-24 text-center">
            <SignedOut>
              <Link
                href="/sign-up"
                aria-label="Sign up free and start creating QR codes with QRify"
                className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 text-md font-semibold text-white shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105"
              >
                Start creating QR codes — free forever
              </Link>
            </SignedOut>
            <SignedIn>
              <Link
                href="/dashboard"
                aria-label="Go to your QRify dashboard to manage your QR codes"
                className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 text-md font-semibold text-white shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105"
              >
                Go to your Dashboard
              </Link>
            </SignedIn>
          </div>
        </div>
      </div>
    </>
  )
}
