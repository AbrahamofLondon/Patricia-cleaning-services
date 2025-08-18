import { useMemo, useRef, useState } from "react";

export default function Home() {
  // ---- Quote calculator ----
  const [hours, setHours] = useState(4);
  const rate = Number(process.env.NEXT_PUBLIC_RATE || 15);
  const total = useMemo(() => Math.max(4, hours) * rate, [hours, rate]);

  // ---- Env (Stripe / WhatsApp / Calendar / Formspree) ----
  const stripeLink = process.env.NEXT_PUBLIC_STRIPE_LINK || "";
  const waPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "447377339910";
  const calendarEmbed = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_EMBED || "";
  const formEndpoint =
    process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/mdkdvvlr";

  // ---- Refs for WhatsApp prefill ----
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);
  const hoursRef = useRef<HTMLInputElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);

  const buildWhatsAppLink = () => {
    const name = nameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const phone = phoneRef.current?.value || "";
    const date = dateRef.current?.value || "";
    const start = timeRef.current?.value || "";
    const hrs = Math.max(4, Number(hoursRef.current?.value || 4));
    const notes = notesRef.current?.value || "";
    const message =
      `📅 Booking request\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n` +
      `Date: ${date}  Start: ${start}\n` +
      `Hours: ${hrs}\n` +
      `Quoted Total: £${hrs * rate}\n` +
      (notes ? `Notes: ${notes}\n` : "");
    return `https://wa.me/${waPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <main className="font-sans">
      {/* HERO */}
      <section className="bg-mint-500 text-white text-center p-16 shadow-lg">
        <h1 className="text-4xl font-bold">Patricia Cleaning</h1>
        <p className="mt-2 text-lg">On-demand housekeeping. Minimum 4 hours.</p>
      </section>

      {/* QUOTE */}
      <section className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Instant Quote</h2>
        <input
          type="range"
          min={4}
          max={10}
          value={hours}
          onChange={(e) => setHours(parseInt(e.target.value))}
          className="w-64 accent-mint-600"
        />
        <p className="mt-3 text-lg">
          {Math.max(4, hours)} hours × £{rate} ={" "}
          <span className="font-bold">£{total}</span>
        </p>
      </section>

      {/* BOOKING FORM */}
      <section className="p-8 text-center bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Book Now</h2>
        <form
          action={formEndpoint}
          method="POST"
          className="max-w-xl mx-auto text-left space-y-3"
        >
          <input ref={nameRef} name="name" placeholder="Name" className="border p-2 w-full rounded" required />
          <input ref={emailRef} name="email" type="email" placeholder="Email" className="border p-2 w-full rounded" required />
          <input ref={phoneRef} name="phone" type="tel" placeholder="Phone" className="border p-2 w-full rounded" />

          <div className="grid grid-cols-2 gap-3">
            <input ref={dateRef} name="date" type="date" className="border p-2 w-full rounded" required />
            <input ref={timeRef} name="start" type="time" className="border p-2 w-full rounded" required />
          </div>

          <input
            ref={hoursRef}
            name="hours"
            type="number"
            min={4}
            defaultValue={Math.max(4, hours)}
            className="border p-2 w-full rounded"
            onChange={(e) => setHours(Math.max(4, Number(e.target.value || 4)))}
            required
          />

          <textarea ref={notesRef} name="notes" placeholder="Notes / access / parking"
            className="border p-2 w-full h-24 rounded" />

          {/* Send calculated total with submission */}
          <input type="hidden" name="calculated_total" value={total} />

          <button className="bg-mint-600 text-white px-4 py-2 rounded w-full hover:bg-mint-700 transition">
            Submit
          </button>
        </form>

        {/* ALT ACTIONS */}
        <div className="mt-6 flex flex-col gap-3 max-w-xl mx-auto">
          <a
            href={buildWhatsAppLink()}
            onClick={(e) => {
              (e.currentTarget as HTMLAnchorElement).href = buildWhatsAppLink();
            }}
            className="border p-2 rounded text-center hover:bg-gray-100 transition"
            target="_blank"
            rel="noreferrer"
          >
            📱 WhatsApp Booking
          </a>

          {stripeLink && (
            <a
              href={stripeLink}
              className="border p-2 rounded text-center hover:bg-gray-100 transition"
              target="_blank"
              rel="noreferrer"
            >
              💳 Pay Deposit
            </a>
          )}
        </div>
      </section>

      {/* AVAILABILITY */}
      <section className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Availability</h2>
        {calendarEmbed ? (
          <iframe src={calendarEmbed} className="w-full rounded shadow" style={{ height: "600px" }} />
        ) : (
          <p className="text-gray-600">No calendar linked</p>
        )}
      </section>
    </main>
  );
}
