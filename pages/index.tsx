// pages/index.tsx
import Head from "next/head";
import { useMemo, useRef, useState } from "react";

export default function Home() {
  // ----- Pricing / Quote -----
  const [hours, setHours] = useState(4);
  const rate = Number(process.env.NEXT_PUBLIC_RATE || 15);
  const total = useMemo(() => Math.max(4, hours) * rate, [hours, rate]);

  // ----- Environment (zero-code control) -----
  const stripeLink   = process.env.NEXT_PUBLIC_STRIPE_LINK || ""; // optional
  const waPhone      = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "447377339910"; // intl w/out +
  const calendarLink = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_EMBED || ""; // optional
  const formEndpoint =
    process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/mdkdvvlr";

  // ----- Form refs for WhatsApp prefill -----
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const dateRef  = useRef<HTMLInputElement>(null);
  const timeRef  = useRef<HTMLInputElement>(null);
  const hrsRef   = useRef<HTMLInputElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);

  // Prefilled WhatsApp message from form fields + quote
  const buildWhatsApp = () => {
    const n = nameRef.current?.value || "";
    const e = emailRef.current?.value || "";
    const p = phoneRef.current?.value || "";
    const d = dateRef.current?.value || "";
    const t = timeRef.current?.value || "";
    const h = Math.max(4, Number(hrsRef.current?.value || hours));
    const notes = notesRef.current?.value || "";
    const msg = [
      "Booking request",
      `Name: ${n}`,
      `Email: ${e}`,
      `Phone: ${p}`,
      `Date: ${d}  Start: ${t}`,
      `Hours: ${h}`,
      `Quoted Total: £${h * rate}`,
      notes && `Notes: ${notes}`,
    ]
      .filter(Boolean)
      .join("\n");
    return `https://wa.me/${waPhone}?text=${encodeURIComponent(msg)}`;
  };

  // (Optional) Sticky CTA WhatsApp quick-start message
  const buildStickyWA = () => {
    const msg =
      "Hi Patricia, I’d like to book a premium on-demand clean. Can we confirm availability?";
    return `https://wa.me/${waPhone}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <>
      <Head>
        <title>Patricia Cleaning – Premium On-Demand Services</title>
        <meta
          name="description"
          content="On-demand housekeeping with no contracts and zero hassle. From new moves to new builds and decluttering, we deliver premium results on your terms."
        />
      </Head>

      {/* NAV */}
      <header className="bg-brand-500 text-white">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <nav className="flex items-center gap-6">
            <a href="#home" className="font-semibold text-lg">Patricia</a>
            <a href="#services" className="hidden md:inline hover:underline">Services</a>
            <a href="#value" className="hidden md:inline hover:underline">Why Us</a>
            <a href="#contact" className="hidden md:inline hover:underline">Contact</a>
          </nav>
          <a href="#book" className="bg-brand-700 hover:bg-brand-800 px-4 py-2 rounded-lg font-semibold">
            Book Now
          </a>
        </div>
      </header>

      <main className="bg-brand-50 text-gray-900" id="home">
        {/* HERO */}
        <section className="bg-brand-50 border-b">
          <div className="max-w-6xl mx-auto px-5 py-12 md:py-16 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-brand-800 leading-tight">
                On-Demand Cleaning, Zero Commitment
              </h1>
              <p className="mt-4 text-lg md:text-xl text-brand-900">
                From new moves to new builds, decluttering to deep cleans —
                <strong> Patricia Cleaning </strong>
                delivers premium results when you need them, without contracts or hassle.
                All you commit to is opening the door; <strong>we commit to transforming your space</strong>.
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  href="#book"
                  className="bg-brand-700 text-white px-5 py-3 rounded-lg font-semibold hover:bg-brand-800"
                >
                  Book Now
                </a>
                <a
                  href="#services"
                  className="px-5 py-3 rounded-lg border border-brand-700 text-brand-800 hover:bg-brand-100"
                >
                  View Services
                </a>
              </div>
            </div>

            {/* Instant Quote Card */}
            <div className="rounded-2xl bg-white border p-6 shadow-sm">
              <h3 className="font-bold text-brand-800">Instant Quote</h3>
              <input
                type="range"
                min={4}
                max={10}
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value))}
                className="w-full mt-4 accent-brand-700"
              />
              <p className="mt-2">
                {hours} hours × £{rate} = <span className="font-bold">£{total}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">Minimum booking 4 hours.</p>
            </div>
          </div>
        </section>

        {/* VALUE PROPOSITION */}
        <section id="value" className="py-14 bg-white">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-3xl font-bold text-center text-brand-800">Why Choose Patricia Cleaning?</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "On-Demand Service",
                  body:
                    "Book when you need it — flexible scheduling without waiting lists.",
                },
                {
                  title: "No Contracts",
                  body:
                    "Zero commitment. Pay only for the hours you use at a fixed hourly rate.",
                },
                {
                  title: "Premium Care",
                  body:
                    "Professional, reliable, detail-oriented housekeeping. We don’t cut corners.",
                },
                {
                  title: "Total Transformation",
                  body:
                    "Deep cleans, new-move sparkle, new-build finishes & decluttering — end results that sell themselves.",
                },
              ].map((c) => (
                <div key={c.title} className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
                  <h3 className="text-xl font-semibold mb-2 text-brand-800">{c.title}</h3>
                  <p className="text-gray-700">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="bg-white">
          <div className="max-w-6xl mx-auto px-5 py-12">
            <h2 className="text-3xl font-bold text-brand-800 text-center">Services</h2>
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {[
                { title: "Standard Clean", pts: ["Dust & vacuum", "Kitchen & bathroom", "Mopping surfaces"] },
                { title: "Deep Clean", pts: ["Detailed skirting/tiles", "Appliance fronts", "Limescale focus"] },
                { title: "End of Tenancy", pts: ["Inside cupboards", "Appliances (add-ons)", "Checklist-ready"] },
              ].map((card) => (
                <div key={card.title} className="border rounded-2xl p-6 shadow-sm bg-white">
                  <h3 className="font-semibold text-lg text-brand-800">{card.title}</h3>
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

        {/* AVAILABILITY */}
        <section className="bg-brand-50">
          <div className="max-w-6xl mx-auto px-5 py-12">
            <h2 className="text-3xl font-bold text-brand-800 text-center">Availability</h2>
            {calendarLink ? (
              <div className="mt-6 rounded-xl overflow-hidden border shadow-sm">
                <iframe src={calendarLink} className="w-full" style={{ height: "600px" }} />
              </div>
            ) : (
              <p className="mt-4 text-center text-sm text-gray-600">Calendar not linked yet.</p>
            )}
          </div>
        </section>

        {/* BOOKING */}
        <section id="book" className="bg-white">
          <div className="max-w-3xl mx-auto px-5 py-12">
            <h2 className="text-3xl font-bold text-brand-800 text-center">Book Now</h2>

            <form action={formEndpoint} method="POST" className="mt-6 grid gap-4">
              <input ref={nameRef}  name="name"  placeholder="Name"  className="border p-3 rounded" required />
              <input ref={emailRef} name="email" type="email" placeholder="Email" className="border p-3 rounded" required />
              <input ref={phoneRef} name="phone" type="tel" placeholder="Phone" className="border p-3 rounded" />
              <div className="grid grid-cols-2 gap-4">
                <input ref={dateRef} name="date"  type="date" className="border p-3 rounded" required />
                <input ref={timeRef} name="start" type="time" className="border p-3 rounded" required />
              </div>
              <input
                ref={hrsRef}
                name="hours"
                type="number"
                min={4}
                defaultValue={hours}
                onChange={(e) => setHours(Math.max(4, Number(e.target.value || 4)))}
                className="border p-3 rounded"
                required
              />
              <textarea
                ref={notesRef}
                name="notes"
                placeholder="Notes / access / parking"
                className="border p-3 rounded h-28"
              />
              {/* Send the current quote with the submission */}
              <input type="hidden" name="calculated_total" value={total} />

              <button className="bg-brand-700 hover:bg-brand-800 text-white py-3 rounded font-semibold">
                Submit Booking
              </button>
            </form>

            <div className="mt-4 grid md:grid-cols-2 gap-3">
              <a
                href={buildWhatsApp()}
                onClick={(e) => {
                  (e.currentTarget as HTMLAnchorElement).href = buildWhatsApp();
                }}
                className="text-center border border-brand-700 text-brand-800 py-3 rounded hover:bg-brand-50"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp Booking (prefilled)
              </a>

              {stripeLink && (
                <a
                  href={stripeLink}
                  className="text-center border border-brand-700 text-brand-800 py-3 rounded hover:bg-brand-50"
                  target="_blank"
                  rel="noreferrer"
                >
                  Pay Deposit
                </a>
              )}
            </div>
          </div>
        </section>

        {/* CONTACT / FOOTER */}
        <footer id="contact" className="bg-brand-50 border-t">
          <div className="max-w-6xl mx-auto px-5 py-10 grid md:grid-cols-2 items-center gap-6">
            <div>
              <div className="text-2xl font-extrabold text-brand-800">Patricia</div>
              <div className="text-brand-800">Housekeeping Services</div>
            </div>
            <div className="md:text-right text-brand-800">
              <div><a href="mailto:abepokmogpa1@gmail.com" className="underline">abepokmogpa1@gmail.com</a></div>
              <div><a href="tel:07377339910" className="underline">07377 339910</a></div>
            </div>
          </div>
        </footer>

        {/* Floating desktop CTA */}
        <a
          href="#book"
          className="hidden md:inline-flex fixed bottom-6 right-6 z-40 rounded-full px-5 py-3 bg-brand-700 text-white font-semibold shadow-lg hover:bg-brand-800"
          aria-label="Book premium cleaning"
        >
          Book Now
        </a>

        {/* Sticky mobile CTA (choose one): scroll-to-book */}
        <a
          href="#book"
          className="fixed inset-x-0 bottom-0 z-50 md:hidden bg-brand-700 text-white text-center py-3 font-semibold shadow-[0_-4px_12px_rgba(0,0,0,.15)]"
        >
          Book Now — Premium On-Demand Cleaning
        </a>

        {/* If you prefer WhatsApp for sticky instead, comment the above and uncomment below:
        <a
          href={buildStickyWA()}
          className="fixed inset-x-0 bottom-0 z-50 md:hidden bg-brand-700 text-white text-center py-3 font-semibold shadow-[0_-4px_12px_rgba(0,0,0,.15)]"
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp • Book Instantly
        </a>
        */}

        {/* Spacer so sticky bar doesn’t cover content on mobile */}
        <div className="h-14 md:hidden" />
      </main>
    </>
  );
}
