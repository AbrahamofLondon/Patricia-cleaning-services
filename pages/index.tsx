// pages/index.tsx
import Head from "next/head";
import { useMemo, useState } from "react";

export default function Home() {
  // ---- Global config (single source of truth) ----
  const MIN_HOURS = 4; // business rule
  const rate = Number(process.env.NEXT_PUBLIC_RATE || 15);

  // ---- Quote calculator ----
  const [hours, setHours] = useState(MIN_HOURS);
  const total = useMemo(
    () => Math.max(MIN_HOURS, hours) * rate,
    [hours, rate]
  );

  // ---- Environment (no-code handover) ----
  const stripe = process.env.NEXT_PUBLIC_STRIPE_LINK || "";
  const waPhone =
    process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "447377339910"; // intl, no +
  const cal = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_EMBED || "";
  const formEndpoint =
    process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ||
    "https://formspree.io/f/mdkdvvlr";

  // Fast-path WhatsApp CTA
  const waMsg = `https://wa.me/${waPhone}?text=${encodeURIComponent(
    "Hi Patricia, I’d like to book a premium on-demand clean. Can we confirm availability?"
  )}`;

  return (
    <>
      <Head>
        <title>Patricia Cleaning – Premium On-Demand Services</title>
        <meta
          name="description"
          content={`On-demand housekeeping with no contracts and zero hassle. Minimum ${MIN_HOURS} hours per visit at £${rate}/hour. Premium results on your terms.`}
        />
      </Head>

      {/* NAV */}
      <header className="bg-emerald-600 text-white">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <nav className="flex items-center gap-6">
            <a href="#home" className="font-semibold text-lg">
              Patricia
            </a>
            <a href="#services" className="hidden md:inline hover:underline">
              Services
            </a>
            <a href="#pricing" className="hidden md:inline hover:underline">
              Pricing
            </a>
            <a href="#contact" className="hidden md:inline hover:underline">
              Contact
            </a>
          </nav>
          <a
            href="#book"
            className="bg-white text-emerald-700 font-semibold px-4 py-2 rounded-lg"
          >
            Book Now
          </a>
        </div>
      </header>

      <main id="home" className="bg-emerald-50 text-gray-900">
        {/* HERO */}
        <section className="border-b">
          <div className="max-w-6xl mx-auto px-5 py-12 md:py-16 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900 leading-tight">
                On-Demand Cleaning, Zero Commitment
              </h1>
              <p className="mt-4 text-lg md:text-xl text-emerald-900/90">
                From new moves to new builds, decluttering to deep cleans —{" "}
                <strong>Patricia Cleaning</strong> delivers premium results when
                you need them, without contracts or hassle. All you commit to is
                opening the door; <strong>we commit to transforming your space</strong>.
                Minimum {MIN_HOURS} hours per visit at £{rate}/hour.
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  href="#book"
                  className="bg-emerald-700 text-white px-5 py-3 rounded-lg font-semibold hover:bg-emerald-800"
                >
                  Book Now
                </a>
                <a
                  href="#services"
                  className="px-5 py-3 rounded-lg border border-emerald-700 text-emerald-800 hover:bg-white"
                >
                  View Services
                </a>
              </div>
            </div>

            {/* Instant Quote */}
            <div className="rounded-2xl bg-white border p-6 shadow-sm">
              <h3 className="font-bold text-emerald-900">Instant Quote</h3>
              <input
                type="range"
                min={MIN_HOURS}
                max={10}
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value))}
                className="w-full mt-4 accent-emerald-700"
              />
              <p className="mt-2">
                {Math.max(MIN_HOURS, hours)} hours × £{rate} ={" "}
                <span className="font-bold">£{total}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Minimum booking {MIN_HOURS} hours.
              </p>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="bg-white">
          <div className="max-w-6xl mx-auto px-5 py-12">
            <h2 className="text-3xl font-bold text-emerald-900 text-center">
              Services
            </h2>
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Standard Clean",
                  pts: ["Dust & vacuum", "Kitchen & bathroom", "Mopping surfaces"],
                },
                {
                  title: "Deep Clean",
                  pts: [
                    "Detailed skirting/tiles",
                    "Appliance fronts",
                    "Limescale focus",
                  ],
                },
                {
                  title: "End of Tenancy",
                  pts: ["Inside cupboards", "Appliances (add-ons)", "Checklist-ready"],
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="border rounded-2xl p-6 shadow-sm bg-white"
                >
                  <h3 className="font-semibold text-lg text-emerald-900">
                    {card.title}
                  </h3>
                  <ul className="mt-3 text-sm text-gray-700 space-y-1">
                    {card.pts.map((p) => (
                      <li key={p}>• {p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING & FAQS (dynamic) */}
        <section id="pricing" className="py-16 bg-emerald-50">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-emerald-900 mb-6">
              Pricing & FAQs
            </h2>
            <p className="text-lg text-emerald-900/80 mb-12">
              Transparent, premium-quality service. No contracts, no hidden
              charges — just a spotless home on your terms.
            </p>

            {/* Pricing Snapshot */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="p-6 border border-emerald-100 rounded-xl shadow-sm bg-white">
                <h3 className="text-xl font-semibold mb-2">Standard</h3>
                <p className="text-emerald-700 mb-4 font-medium">
                  From £{rate}/hour
                </p>
                <p className="text-sm text-gray-600">
                  Minimum {MIN_HOURS} hours per booking. Ideal for routine refresh.
                </p>
              </div>
              <div className="p-6 border border-emerald-200 rounded-xl shadow-md bg-white">
                <h3 className="text-xl font-semibold mb-2">Extended</h3>
                <p className="text-emerald-700 mb-4 font-medium">
                  Preferential rates for 6+ hours
                </p>
                <p className="text-sm text-gray-600">
                  Perfect for deep cleans, move-in/out, or new builds.
                </p>
              </div>
              <div className="p-6 border border-emerald-100 rounded-xl shadow-sm bg-white">
                <h3 className="text-xl font-semibold mb-2">Emergency</h3>
                <p className="text-emerald-700 mb-4 font-medium">
                  Premium rates apply
                </p>
                <p className="text-sm text-gray-600">
                  Same-day/short-notice accepted when available.
                </p>
              </div>
            </div>

            {/* FAQs */}
            <div className="text-left space-y-6 max-w-3xl mx-auto">
              <div>
                <h4 className="font-semibold text-emerald-900">
                  Do I need a contract?
                </h4>
                <p className="text-gray-700">
                  No. Every booking is commitment-free. Pay only for the hours
                  you use at £{rate}/hour.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-emerald-900">
                  What’s the minimum booking?
                </h4>
                <p className="text-gray-700">
                  {MIN_HOURS} hours. This ensures every session delivers
                  noticeable transformation.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-emerald-900">
                  How do cancellations work?
                </h4>
                <p className="text-gray-700">
                  Cancellations must be made at least{" "}
                  <strong>72 hours in advance</strong>. Less notice may incur a
                  charge, reflecting the reserved team and the {MIN_HOURS}-hour
                  minimum.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-emerald-900">
                  Do you offer discounts or emergency booking?
                </h4>
                <p className="text-gray-700">
                  Yes — longer bookings (6+ hours) receive preferential rates
                  over the standard £{rate}/hour. Emergency/short-notice
                  bookings are accepted when available and priced accordingly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AVAILABILITY */}
        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-5 py-12">
            <h2 className="text-3xl font-bold text-emerald-900 text-center">
              Availability
            </h2>
            {cal ? (
              <div className="mt-6 rounded-xl overflow-hidden border shadow-sm">
                <iframe src={cal} className="w-full" style={{ height: "600px" }} />
              </div>
            ) : (
              <p className="mt-4 text-center text-sm text-gray-600">
                Calendar not linked yet.
              </p>
            )}
          </div>
        </section>

        {/* BOOKING */}
        <section id="book" className="bg-white">
          <div className="max-w-3xl mx-auto px-5 py-12">
            <h2 className="text-3xl font-bold text-emerald-900 text-center">
              Book Now
            </h2>

            <form action={formEndpoint} method="POST" className="mt-6 grid gap-4">
              <input name="name" placeholder="Name" className="border p-3 rounded" required />
              <input name="email" type="email" placeholder="Email" className="border p-3 rounded" required />
              <input name="phone" type="tel" placeholder="Phone" className="border p-3 rounded" />
              <div className="grid grid-cols-2 gap-4">
                <input name="date"  type="date" className="border p-3 rounded" required />
                <input name="start" type="time" className="border p-3 rounded" required />
              </div>
              <input
                name="hours"
                type="number"
                min={MIN_HOURS}
                defaultValue={hours}
                onChange={(e) =>
                  setHours(Math.max(MIN_HOURS, Number(e.target.value || MIN_HOURS)))
                }
                className="border p-3 rounded"
                required
              />
              <textarea
                name="notes"
                placeholder="Notes / access / parking"
                className="border p-3 rounded h-28"
              />
              {/* sync the quote with submission */}
              <input type="hidden" name="calculated_total" value={total} />

              <button className="bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded font-semibold">
                Submit Booking
              </button>
            </form>

            <div className="mt-4 grid md:grid-cols-2 gap-3">
              <a
                href={waMsg}
                className="text-center border border-emerald-700 text-emerald-800 py-3 rounded hover:bg-emerald-50"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp Booking (prefilled)
              </a>
              {stripe && (
                <a
                  href={stripe}
                  className="text-center border border-emerald-700 text-emerald-800 py-3 rounded hover:bg-emerald-50"
                  target="_blank"
                  rel="noreferrer"
                >
                  Pay Deposit
                </a>
              )}
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              Minimum {MIN_HOURS} hours per booking at £{rate}/hour. 72-hour cancellation policy applies.
            </p>
          </div>
        </section>

        {/* CONTACT / FOOTER */}
        <footer id="contact" className="bg-emerald-50 border-t">
          <div className="max-w-6xl mx-auto px-5 py-10 grid md:grid-cols-2 items-center gap-6">
            <div>
              <div className="text-2xl font-extrabold text-emerald-900">Patricia</div>
              <div className="text-emerald-900/90">Housekeeping Services</div>
            </div>
            <div className="md:text-right text-emerald-900">
              <div>
                <a href="mailto:abepokmogpa1@gmail.com" className="underline">
                  abepokmogpa1@gmail.com
                </a>
              </div>
              <div>
                <a href="tel:07377339910" className="underline">
                  07377 339910
                </a>
              </div>
            </div>
          </div>
        </footer>

        {/* Floating desktop CTA */}
        <a
          href="#book"
          className="hidden md:inline-flex fixed bottom-6 right-6 z-40 rounded-full px-5 py-3 bg-emerald-700 text-white font-semibold shadow-lg hover:bg-emerald-800"
          aria-label="Book premium cleaning"
        >
          Book Now
        </a>

        {/* Sticky mobile CTA */}
        <a
          href="#book"
          className="fixed inset-x-0 bottom-0 z-50 md:hidden bg-emerald-700 text-white text-center py-3 font-semibold shadow-[0_-4px_12px_rgba(0,0,0,.15)]"
        >
          Book Now — Premium On-Demand Cleaning
        </a>
        <div className="h-14 md:hidden" />
      </main>
    </>
  );
}
