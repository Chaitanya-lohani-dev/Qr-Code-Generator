import { CheckBadgeIcon, BoltIcon, Squares2X2Icon, CloudArrowDownIcon, DevicePhoneMobileIcon, ShieldCheckIcon, ChartBarIcon, PaintBrushIcon, QueueListIcon, ClockIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
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

      {/* Why QRify Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-cyan-600">Why Choose QRify?</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Built for simplicity and power
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              See how QRify compares to other QR code generators in the market.
            </p>
          </div>

          <div className="mt-16 overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-900/5">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Feature</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-cyan-600">QRify</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-slate-500">Other Generators</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {[
                    { feature: "Instant QR Generation", qrify: true, others: true },
                    { feature: "Personal Dashboard", qrify: true, others: false },
                    { feature: "Secure Authentication", qrify: true, others: false },
                    { feature: "High-Quality Downloads", qrify: true, others: true },
                    { feature: "Link Tracking", qrify: true, others: false },
                    { feature: "Analytics (Coming Soon)", qrify: true, others: false },
                    { feature: "Customization (Coming Soon)", qrify: true, others: false },
                    { feature: "Bulk Generation (Coming Soon)", qrify: true, others: false },
                  ].map((row, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{row.feature}</td>
                      <td className="px-6 py-4 text-center">
                        {row.qrify ? (
                          <CheckIcon className="h-5 w-5 text-cyan-600 mx-auto" />
                        ) : (
                          <XMarkIcon className="h-5 w-5 text-slate-300 mx-auto" />
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.others ? (
                          <CheckIcon className="h-5 w-5 text-slate-400 mx-auto" />
                        ) : (
                          <XMarkIcon className="h-5 w-5 text-slate-300 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-cyan-600">Coming Soon</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Exciting features in development
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              We're constantly working to make QRify even better. Here's what's coming next.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  name: 'Advanced Analytics',
                  description: 'Track scan counts, locations, devices, and time patterns with detailed insights.',
                  icon: ChartBarIcon,
                  status: 'In Development',
                },
                {
                  name: 'Custom Styling',
                  description: 'Customize colors, add logos, and create branded QR codes that match your style.',
                  icon: PaintBrushIcon,
                  status: 'Planned',
                },
                {
                  name: 'Bulk Generation',
                  description: 'Generate multiple QR codes at once from CSV files or URL lists.',
                  icon: QueueListIcon,
                  status: 'Planned',
                },
              ].map((feature) => (
                <div key={feature.name} className="relative pl-16 transition-all duration-300 hover:scale-105">
                  <dt className="text-base font-semibold leading-7 text-slate-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                    <span className="ml-2 inline-flex items-center rounded-full bg-cyan-100 px-2 py-1 text-xs font-medium text-cyan-800">
                      {feature.status}
                    </span>
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-slate-600">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-cyan-600">Use Cases</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Perfect for every scenario
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              From small businesses to large events, QRify adapts to your needs.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Restaurant Menus',
                  description: 'Create QR codes for digital menus. Customers scan to view your full menu on their phones.',
                  icon: '🍽️',
                },
                {
                  title: 'Event Check-ins',
                  description: 'Generate QR codes for event tickets. Track attendance and manage guest lists effortlessly.',
                  icon: '🎫',
                },
                {
                  title: 'Business Cards',
                  description: 'Add QR codes to business cards linking to your portfolio, contact info, or social media.',
                  icon: '💼',
                },
                {
                  title: 'WiFi Sharing',
                  description: 'Create QR codes that automatically connect guests to your WiFi network.',
                  icon: '📶',
                },
                {
                  title: 'Product Information',
                  description: 'Link QR codes to product details, reviews, or purchase pages for better customer experience.',
                  icon: '📦',
                },
                {
                  title: 'Social Media',
                  description: 'Generate QR codes linking to your social media profiles to grow your following.',
                  icon: '📱',
                },
              ].map((useCase, index) => (
                <div key={index} className="group relative rounded-xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                  <div className="text-3xl mb-4">{useCase.icon}</div>
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-cyan-600 transition-colors">
                    {useCase.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {useCase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
