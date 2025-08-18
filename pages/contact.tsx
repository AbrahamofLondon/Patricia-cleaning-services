export default function Contact() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <p>
        Email:{" "}
        <a
          href="mailto:abepokmogpa1@gmail.com"
          className="text-blue-600"
        >
          abepokmogpa1@gmail.com
        </a>
      </p>
      <p>
        Phone:{" "}
        <a href="tel:+447377339910" className="text-blue-600">
          +44 7377339910
        </a>
      </p>
      <p className="mt-4">
        Or use the booking form to schedule a clean directly.
      </p>
    </div>
  );
}
