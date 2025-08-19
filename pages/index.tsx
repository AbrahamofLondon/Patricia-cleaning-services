import Link from "next/link";
import Navbar from "@/components/Navbar";

const CAL = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_EMBED || "";
const RATE = process.env.NEXT_PUBLIC_RATE || "15";

export default function Home() {
  return (
    <div>
      <Navbar />

      {/* Hero */}
      <section id="home" className="bg-blue-50 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Patricia’s Cleaning Services</h1>
        <p className="text-lg mb-4 max-w-2xl mx-auto">
          Reliable, professional, and trustworthy housekeeping. Minimum 4 hours at a fixed hourly rate.
        </p>
        <p className="inline-block bg-white/80 text-blue-700 px-3 py-1 rounded mb-6">
          Minimum 4 hours • £{RATE}/h • Pro-rata thereafter
        </p>
        <div>
          {/* On the homepage, use hash-only link */}
          <a
            href="#book"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700"
          >
            Book Now
          </a>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-12 bg-white text-center">
        <h2 className="text-2xl font-bold mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-6 border rounded-lg shadow hover:shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Deep Cleaning</h3>
            <p>Thorough and detailed cleaning for spotless results.</p>
          </div>
          <div className="p-6 border rounded-lg shadow hover:shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Regular Cleaning</h3>
            <p>Consistent upkeep to keep your home fresh and tidy.</p>
          </div>
          <div className="p-6 border rounded-lg shadow hover:shadow-lg">
            <h3 className="text-xl font-semibold mb-2">After-Party Cleaning</h3>
            <p>Quick turnaround cleaning so you can relax after the fun.</p>
          </div>
        </div>
      </section>

      {/* Pricing / Minimum booking */}
      <section id="pricing" className="py-12 bg-gray-50 text-center">
        <h2 className="text-2xl font-bold mb-4">Minimum Booking</h2>
        <p>4 hours at £{RATE}/hour. Additional hours billed pro-rata.</p>
      </section>

      {/* Availability */}
      <section id="availability" className="py-12 bg-white text-center">
        <h2 className="text-2xl font-bold mb-4">Availability</h2>
        <div className="max-w-5xl mx-auto">
          {CAL ? (
            <iframe
              src={CAL}
              className="w-full border rounded"
              style={{ height: "700px" }}
            />
          ) : (
            <p className="text-gray-500">Calendar coming soon.</p>
          )}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-12 bg-gray-50 text-center">
        <h2 className="text-2xl font-bold mb-2">Contact</h2>
        <p>
          Email: <a className="underline" href="mailto:abepokmogpa1@gmail.com">abepokmogpa1@gmail.com</a>
          {" · "}
          Phone: <a className="underline" href="tel:07377339910">07377 339910</a>
        </p>
      </section>

      {/* Book anchor target */}
      <section id="book" className="py-12 bg-white text-center">
        <Link
          href="/booking"
          className="px-6 py-3 bg-mint-600 text-white font-semibold rounded-lg shadow hover:bg-mint-700"
        >
          Go to Booking
        </Link>
      </section>
    </div>
  );
}
