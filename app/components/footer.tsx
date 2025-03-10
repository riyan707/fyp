import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white py-10">
      <div className="mx-auto max-w-7xl px-4">
        {/* Top section: Subscribe, Avatars, Form */}
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Left side: Headline, avatars, subtext */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">
              SUBSCRIBE NOW FOR UPDATES AND EXCLUSIVE TIPS &amp; TRICKS
            </h2>
            <div className="flex items-center gap-4">
              {/* Avatars (example placeholders) */}
              <div className="flex -space-x-2">
                <Image
                  src="/avatar1.png"
                  alt="Avatar 1"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                />
                <Image
                  src="/avatar2.png"
                  alt="Avatar 2"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                />
                <Image
                  src="/avatar3.png"
                  alt="Avatar 3"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                />
              </div>
              <p className="text-gray-600 text-sm">
                Join the other 2,000+ members
              </p>
            </div>
          </div>

          {/* Right side: Subscription form */}
          <form className="flex w-full max-w-md flex-col items-start gap-2 sm:flex-row lg:items-center">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="jane@farnser.com"
              className="w-full flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300"
            />
            <button
              type="submit"
              className="mt-1 w-full rounded-md bg-black px-6 py-2 text-sm font-semibold text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black sm:mt-0 sm:w-auto"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Bottom section: Company, Support, Social */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {/* Column 1: Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-800">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#">About Us</Link>
              </li>
              <li>
                <Link href="#">Find Placement</Link>
              </li>
              <li>
                <Link href="#">Messages</Link>
              </li>
              <li>
                <Link href="#">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Support */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-800">
              Support
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#">Help Center</Link>
              </li>
              <li>
                <Link href="#">FAQs</Link>
              </li>
              <li>
                <Link href="#">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Social */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-800">
              Social
            </h3>
            <ul className="flex gap-4 text-gray-600">
              {/* Replace # with actual links and placeholders with icons you prefer */}
              <li>
                <Link href="#">X</Link>
              </li>
              <li>
                <Link href="#">Fb</Link>
              </li>
              <li>
                <Link href="#">In</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
