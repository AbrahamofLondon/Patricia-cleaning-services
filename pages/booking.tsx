import { useState } from "react";

export default function Booking() {
  const [form, setForm] = useState({ name: "", email: "", date: "", hours: "4" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Booking request submitted for ${form.hours} hours on ${form.date}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Book a Cleaning</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="hours"
          value={form.hours}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="4">4 hours</option>
          <option value="5">5 hours</option>
          <option value="6">6 hours</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit Booking
        </button>
      </form>
    </div>
  );
}
