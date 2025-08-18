import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItem =
    "block px-3 py-2 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:underline";

  return (
    <header
      className={`sticky top-0 z-50 bg-white/90 backdrop-blur border-b transition-shadow ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <Link href="#home" className="font-extrabold text-lg md:text-xl">
          Patricia
        </Link>

        <div className="hidden md:flex items-center gap-2">
          <Link href="#services" className={navItem}>Services</Link>
          <Link href="#pricing" className={navItem}>Pricing</Link>
          <Link href="#availability" className={navItem}>Availability</Link>
          <Link href="#contact" className={navItem}>Contact</Link>
          <Link href="/about" className={navItem}>About</Link>
          <Link
            href="#book"
            className="ml-2 inline-flex items-center rounded-lg bg-mint-600 text-white px-4 py-2 hover:bg-mint-700"
          >
            Book Now
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden inline-flex items-center justify-center rounded p-2 hover:bg-gray-100"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d={open ? "M6 18L18 6M6 6l12 12" : "M3 6h18M3 12h18M3 18h18"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="max-w-6xl mx-auto px-4 py-2">
            <Link href="#services" className={navItem} onClick={() => setOpen(false)}>Services</Link>
            <Link href="#pricing" className={navItem} onClick={() => setOpen(false)}>Pricing</Link>
            <Link href="#availability" className={navItem} onClick={() => setOpen(false)}>Availability</Link>
            <Link href="#contact" className={navItem} onClick={() => setOpen(false)}>Contact</Link>
            <Link href="/about" className={navItem} onClick={() => setOpen(false)}>About</Link>
            <Link
              href="#book"
              onClick={() => setOpen(false)}
              className="mt-2 block w-full text-center rounded-lg bg-mint-600 text-white px-4 py-2 hover:bg-mint-700"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
