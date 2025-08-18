export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-50 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Patricia’s Cleaning Services</h1>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Reliable, professional, and trustworthy housekeeping. Whether you need a one-time deep clean or regular upkeep, Patricia delivers with care and attention to detail.
        </p>
        <a
          href="/booking"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700"
        >
          Book Now
        </a>
      </section>

      {/* Services Section */}
      <section className="py-12 bg-white text-center">
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

      {/* Booking Info */}
      <section className="py-12 bg-gray-50 text-center">
        <h2 className="text-2xl font-bold mb-4">Minimum Booking</h2>
        <p>4 hours at a fixed hourly rate.</p>
      </section>
    </div>
  );
}
