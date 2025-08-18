// pages/booking.tsx (Next.js + Tailwind)
// Env needed in .env.local:
// NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/mdkdvvlr
// NEXT_PUBLIC_RATE=15
// NEXT_PUBLIC_WHATSAPP_PHONE=447377339910   (no +, intl format)
// NEXT_PUBLIC_STRIPE_LINK=                  (optional)

import { useMemo, useState } from "react";

const FORMSPREE =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/mdkdvvlr";
const RATE = Number(process.env.NEXT_PUBLIC_RATE || 15);
const WA_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "447377339910";
const STRIPE = process.env.NEXT_PUBLIC_STRIPE_LINK || "";

type FormShape = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  hours: string; // keep as string for <select>
  service: string;
  notes: string;
  bring_supplies: boolean;
};

export default function Booking() {
  const [form, setForm] = useState<FormShape>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    hours: "4",
    service: "Standard Clean",
    notes: "",
    bring_supplies: false,
  });
  const [submitting, setSubmitting] = useState(false);

  const total = useMemo(() => Number(form.hours) * RATE, [form.hours]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
      fd.append("calculated_total", String(total));
      const res = await fetch(FORMSPREE, { method: "POST", body: fd, mode: "no-cors" });
      // Formspree returns opaque response with no-cors; treat as success.
      alert(`Thanks ${form.name}! We’ll confirm ${form.hours}h on ${form.date} at ${form.time}.`);
      setForm({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        hours: "4",
        service: "Standard Clean",
        notes: "",
        bring_supplies: false,
      });
    } catch (err) {
      alert("Sorry—couldn’t submit right now. Please try again or use WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappHref = useMemo(() => {
    const lines = [
      "Booking request:",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Service: ${form.service}`,
      `Date: ${form.date}`,
      `Start: ${form.time}`,
      `Hours: ${form.hours}`,
      `Bring supplies: ${form.bring_supplies ? "Yes" : "No"}`,
      `Quoted Total: £${total}`,
      form.notes ? `Notes: ${form.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(lines)}`;
  }, [form, total]);

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-2">Book a Cleaning</h2>
      <p className="text-sm text-gray-600 mb-6">
        Minimum 4 hours at fixed hourly rate (£{RATE}/h). Total updates automatically.
      </p>

      <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={onChange}
            className="w-full border p-3 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={onChange}
            className="w-full border p-3 rounded"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={onChange}
            className="w-full border p-3 rounded"
          />
          <select
            name="service"
            value={form.service}
            onChange={onChange}
            className="w-full border p-3 rounded"
          >
            <option>Standard Clean</option>
            <option>Deep Clean</option>
            <option>Move-out / End of Tenancy</option>
          </select>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={onChange}
            className="w-full border p-3 rounded"
            required
          />
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={onChange}
            className="w-full border p-3 rounded"
            required
          />
          <select
            name="hours"
            value={form.hours}
            onChange={onChange}
            className="w-full border p-3 rounded"
          >
            {Array.from({ length: 7 }, (_, i) => 4 + i).map((h) => (
              <option key={h} value={h}>{h} hours</option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="bring_supplies"
              checked={form.bring_supplies}
              onChange={onChange}
            />
            Bring supplies
          </label>
        </div>

        <textarea
          name="notes"
          placeholder="Notes (access, pets, parking, etc.)"
          value={form.notes}
          onChange={onChange}
          className="w-full border p-3 rounded"
        />

        <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
          <div>
            <div className="text-xs uppercase text-gray-500">Estimated total</div>
            <div className="text-xl font-bold">£{total}</div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit Booking"}
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="text-center border border-blue-600 text-blue-700 py-3 rounded-lg hover:bg-blue-50"
          >
            WhatsApp Booking (prefilled)
          </a>
          {STRIPE && (
            <a
              href={STRIPE}
              target="_blank"
              rel="noreferrer"
              className="text-center border border-blue-600 text-blue-700 py-3 rounded-lg hover:bg-blue-50"
            >
              Pay Deposit
            </a>
          )}
        </div>
      </form>

      <p className="text-xs text-gray-500 mt-3">
        Final time confirmed on-site. You’ll receive an email/SMS confirmation after submission.
      </p>
    </div>
  );
}
