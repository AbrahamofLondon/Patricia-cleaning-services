// pages/api/book.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  const { name, email, phone, date, time, hours, service, notes, bring_supplies, total } = req.body || {};
  // Call Resend or your SMTP here. Pseudo:
  // await resend.emails.send({ to: process.env.BOOKINGS_TO!, subject: `Booking: ${name}`, html: ... });
  return res.status(200).json({ ok: true });
}
