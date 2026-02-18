import Link from 'next/link'
import { CreditCard, QrCode, Share2 } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 text-2xl font-bold text-blue-600">
              E-Card
            </a>
          </div>
          <div className="flex lg:flex-1 lg:justify-end space-x-4">
            <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100 hover:text-blue-600">
              Log in
            </Link>
            <Link href="/register" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      <main className="isolate">
        {/* Hero section */}
        <div className="relative pt-14">
          <div className="py-24 sm:py-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                  The Future of Business Networking
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                  Create, customize, and share your digital business card in seconds.
                  Go paperless with QR codes and instant sharing.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    href="/register"
                    className="rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Create Your Card
                  </Link>
                  <a href="#features" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature section */}
        <div id="features" className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Networking Evolved</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to connect
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <CreditCard className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Digital Cards
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                  Customizable templates that look great on any device.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <QrCode className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Instant QR Sharing
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                  Share your profile instantly with a simple scan. No app required.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Share2 className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Easy Export
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                  Download as PDF or PNG for offline use or printing.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </div>
  )
}
