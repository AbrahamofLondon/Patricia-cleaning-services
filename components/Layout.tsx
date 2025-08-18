import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="bg-white shadow-md">
        <nav className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-xl font-bold text-gray-800">
            Patricia’s Cleaning
          </h1>
          <ul className="flex gap-6 text-gray-700 font-medium">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/booking">Booking</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </nav>
      </header>

      {/* Page Content */}
      <main className="flex-grow container mx-auto px-6 py-10 max-w-3xl">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-8">
        <p>© {new Date().getFullYear()} Patricia’s Cleaning Services. All rights reserved.</p>
        <p className="text-sm mt-1">Professional housekeeping with integrity & reliability.</p>
      </footer>
    </div>
  );
}
